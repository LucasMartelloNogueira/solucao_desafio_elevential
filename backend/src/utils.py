from typing import Any

def get_success_response(data: dict[str, Any]):
    return {
        "status": 200,
        "status_msg": "OK",
        "data": data
    }
