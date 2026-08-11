import requests
from bs4 import BeautifulSoup
from flask import Blueprint, jsonify, request
from urllib.parse import urljoin, urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed

schemes_bp = Blueprint("schemes", __name__)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache"
}

REQUEST_TIMEOUT = 20
MAX_WORKERS = 10

SOURCES = [
    {
        "name": "Vikaspedia",
        "type": "vikaspedia",
        "index_url": "https://en.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers?lgn=en",
        "base_url": "https://en.vikaspedia.in",
        "link_prefix": "/viewcontent/schemesall/schemes-for-farmers/",
        "default_limit": 25
    },
    {
        "name": "IGOD",
        "type": "igod",
        "index_url": "https://igod.gov.in/organization/QNe83XQBYNG-XPnvjOsx/SPMA/list",
        "base_url": "https://igod.gov.in",
        "exclude_hosts": {
            "igod.gov.in", "facebook.com", "x.com", "twitter.com", "nic.in",
            "meity.gov.in", "digitalindia.gov.in", "mygov.in", "data.gov.in",
            "pmindia.gov.in", "pgportal.gov.in", "goidirectory.gov.in"
        },
        "default_limit": 20
    }
]


def clean_text(text):
    if not text:
        return ""
    return " ".join(text.split()).strip()


def fetch_html(url):
    response = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
    response.raise_for_status()
    return response.text


def discover_vikaspedia_links(source, limit):
    html = fetch_html(source["index_url"])
    soup = BeautifulSoup(html, "html.parser")
    seen = set()
    links = []
    for anchor in soup.find_all("a", href=True):
        href = anchor["href"]
        if source["link_prefix"] not in href:
            continue
        absolute_url = urljoin(source["base_url"], href)
        if absolute_url in seen:
            continue
        seen.add(absolute_url)
        title = clean_text(anchor.get_text(" ", strip=True))
        links.append({"title": title, "url": absolute_url})
        if len(links) >= limit:
            break
    return links


def discover_igod_links(source, limit):
    html = fetch_html(source["index_url"])
    soup = BeautifulSoup(html, "html.parser")
    seen = set()
    links = []
    for anchor in soup.find_all("a", href=True, target="_blank"):
        href = anchor["href"]
        if not href.startswith("http"):
            continue
        host = urlparse(href).netloc.lower().replace("www.", "")
        if host in source["exclude_hosts"]:
            continue
        title = clean_text(anchor.get_text(" ", strip=True))
        if not title or href in seen:
            continue
        seen.add(href)
        links.append({"title": title, "url": href})
        if len(links) >= limit:
            break
    return links


def extract_section(soup, keywords):
    items = []
    for heading in soup.find_all(["h2", "h3", "h4"]):
        heading_text = clean_text(heading.get_text(" ", strip=True)).lower()
        if not any(keyword in heading_text for keyword in keywords):
            continue
        element = heading.find_next_sibling()
        while element:
            if element.name in ["ul", "ol"]:
                for li in element.find_all("li"):
                    text = clean_text(li.get_text(" ", strip=True))
                    if text:
                        items.append(text)
                break
            if element.name == "p":
                text = clean_text(element.get_text(" ", strip=True))
                if text:
                    items.append(text)
            element = element.find_next_sibling()
    return items


def extract_scheme(url, default_title, source_name):
    try:
        html = fetch_html(url)
        soup = BeautifulSoup(html, "html.parser")
        title = default_title
        h1 = soup.find("h1")
        if h1:
            extracted_title = clean_text(h1.get_text(" ", strip=True))
            if extracted_title:
                title = extracted_title
        description = ""
        meta = soup.find("meta", attrs={"name": "description"})
        if meta:
            description = clean_text(meta.get("content", ""))
        if not description:
            for paragraph in soup.find_all("p"):
                text = clean_text(paragraph.get_text(" ", strip=True))
                if len(text) > 40:
                    description = text
                    break
        benefits = extract_section(soup, ["benefit"])
        eligibility = extract_section(soup, ["eligib"])
        how_to_apply = extract_section(soup, ["how to apply", "application"])
        return {
            "title": title,
            "description": description,
            "benefits": benefits,
            "eligibility": eligibility,
            "how_to_apply": how_to_apply,
            "url": url,
            "source": source_name
        }
    except requests.RequestException as error:
        return {
            "title": default_title,
            "description": "",
            "benefits": [],
            "eligibility": [],
            "how_to_apply": [],
            "url": url,
            "source": source_name,
            "error": str(error)
        }
    except Exception as error:
        return {
            "title": default_title,
            "description": "",
            "benefits": [],
            "eligibility": [],
            "how_to_apply": [],
            "url": url,
            "source": source_name,
            "error": str(error)
        }


def discover_source_links(source, limit):
    try:
        if source["type"] == "vikaspedia":
            return discover_vikaspedia_links(source, limit)
        if source["type"] == "igod":
            return discover_igod_links(source, limit)
        return []
    except requests.RequestException:
        return []


@schemes_bp.route("/api/schemes", methods=["GET"])
def get_schemes():
    total_limit = min(int(request.args.get("limit", 40)), 100)
    per_source_limit = max(total_limit // len(SOURCES), 1)

    targets = []
    for source in SOURCES:
        links = discover_source_links(source, min(source["default_limit"], per_source_limit))
        for link in links:
            targets.append((link["url"], link["title"], source["name"]))
        if len(targets) >= total_limit:
            break

    targets = targets[:total_limit]
    schemes = []

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = [executor.submit(extract_scheme, url, title, source_name) for url, title, source_name in targets]
        for future in as_completed(futures):
            schemes.append(future.result())

    schemes.sort(key=lambda item: item["title"])

    return jsonify({
        "status": "success",
        "count": len(schemes),
        "sources": [source["name"] for source in SOURCES],
        "schemes": schemes
    })