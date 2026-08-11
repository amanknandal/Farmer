import time
from threading import Lock

_store = {}
_lock = Lock()


def get(key):
    with _lock:
        entry = _store.get(key)
        if not entry:
            return None
        value, expires_at = entry
        if time.time() > expires_at:
            _store.pop(key, None)
            return None
        return value


def set(key, value, ttl_seconds):
    with _lock:
        _store[key] = (value, time.time() + ttl_seconds)
