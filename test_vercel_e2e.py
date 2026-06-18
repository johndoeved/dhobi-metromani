import urllib.request
import json

base_url = "https://dhobi-samaj-metromany.vercel.app"

# 1. Admin Login
login_url = f"{base_url}/api/auth/admin-login"
login_payload = json.dumps({
    "email": "admin@dhobimatrimony.com",
    "password": "DhobiMatrimony@Admin#2026!"
}).encode("utf-8")

req = urllib.request.Request(
    login_url, 
    data=login_payload, 
    headers={"Content-Type": "application/json"}
)

try:
    with urllib.request.urlopen(req) as res:
        login_data = json.loads(res.read().decode())
        print("Login success:", login_data.get("success"))
        token = login_data.get("token")
        
        # 2. Get Users using the new token
        users_url = f"{base_url}/api/users"
        users_req = urllib.request.Request(
            users_url,
            headers={"Authorization": f"Bearer {token}"}
        )
        with urllib.request.urlopen(users_req) as users_res:
            users_data = json.loads(users_res.read().decode())
            print("Fetch users success:", users_data.get("success"))
            users_list = users_data.get("users", [])
            print(f"Total users fetched: {len(users_list)}")
            if users_list:
                print("First user sample:", users_list[0].get("name") or users_list[0].get("email"))
except Exception as e:
    print("Error:", e)
