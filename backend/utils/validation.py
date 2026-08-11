import re

EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
PHONE_PATTERN = re.compile(r"^\+?[0-9]{7,15}$")


class ValidationError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)


def require_fields(data, fields):
    missing = [f for f in fields if not str(data.get(f, "")).strip()]
    if missing:
        raise ValidationError(f"Missing required field(s): {', '.join(missing)}")


def clean_text(value, max_length=None, min_length=None, field_name="field"):
    if value is None:
        raise ValidationError(f"{field_name} is required")
    text = str(value).strip()
    if min_length is not None and len(text) < min_length:
        raise ValidationError(f"{field_name} must be at least {min_length} characters")
    if max_length is not None and len(text) > max_length:
        raise ValidationError(f"{field_name} must be under {max_length} characters")
    return text


def clean_email(value, required=True):
    if not value or not str(value).strip():
        if required:
            raise ValidationError("email is required")
        return None
    email = str(value).strip().lower()
    if not EMAIL_PATTERN.match(email):
        raise ValidationError("email is not valid")
    if len(email) > 120:
        raise ValidationError("email is too long")
    return email


def clean_phone(value):
    phone = str(value or "").strip()
    if not PHONE_PATTERN.match(phone):
        raise ValidationError("phone number is not valid")
    return phone


def clean_int(value, field_name="value", min_value=None, max_value=None):
    try:
        number = int(value)
    except (TypeError, ValueError):
        raise ValidationError(f"{field_name} must be a whole number")
    if min_value is not None and number < min_value:
        raise ValidationError(f"{field_name} must be at least {min_value}")
    if max_value is not None and number > max_value:
        raise ValidationError(f"{field_name} must be at most {max_value}")
    return number
