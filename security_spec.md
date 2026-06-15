# Security Specification & "Dirty Dozen" Threat Vectors

## 1. Data Invariants

1. **User Status & Verified Invariant**: A standard user profile (`users/{userId}`) can only be verified or blocked by an account that exists in `/admins/{adminId}`. A user cannot self-verify (`isVerified = true`) or unblock themselves if they are flagged.
2. **Admin Privilege Invariant**: Auth tokens do not contain custom claims. Roles must be verified by check against `/admins/$(request.auth.uid)`.
3. **Subscriptions Invariant**: A user subscription record cannot be created or modified by the user directly to gain free premium access; only an Administrator or an automated payment webhook (mocked or private) can write/manage subscription documents.
4. **Temporal Integrity Invariant**: All messages and updates must register real-time server stamps matching `request.time`.
5. **PII Protection**: Private PII like user email or physical logs inside `users` profiles must be locked against arbitrary list queries from other standard accounts. Only the profile owner or verified admins can read.

---

## 2. The "Dirty Dozen" Payloads (Exploit Payloads)

Here are 12 specific exploit payloads attempting to bypass identity, integrity, or system state.

### Payload 1: Self-Verification Profile Hijack
* **Target Path**: `users/attacker_uid` (Create or Update)
* **Exploit Details**: An unverified user attempts to create a profile with `isVerified: true` and `status: "active"`.
* **Payload**:
  ```json
  {
    "uid": "attacker_uid",
    "name": "Jane Doe",
    "email": "attacker@gmail.com",
    "status": "active",
    "isVerified": true,
    "membership": "free"
  }
  ```
* **Expected Result**: `PERMISSION_DENIED` (cannot self-verify without admin privilege).

### Payload 2: Exploit Spoofed Free Premium Upgrade
* **Target Path**: `users/attacker_uid` (Update)
* **Exploit Details**: A standard user attempts to elevate their own tier directly to premium in their user profile without buying a subscription.
* **Payload**:
  ```json
  {
    "membership": "premium"
  }
  ```
* **Expected Result**: `PERMISSION_DENIED` (membership field is immutable by the owner; requires admin or specific subscription flow).

### Payload 3: Spoofed Identity Write
* **Target Path**: `users/victim_uid` (Create)
* **Exploit Details**: An authenticated attacker tries to overwrite a victim's profile using their own auth token.
* **Payload**:
  ```json
  {
    "uid": "victim_uid",
    "name": "Victim",
    "email": "victim@gmail.com",
    "status": "active",
    "isVerified": false,
    "membership": "free"
  }
  ```
* **Expected Result**: `PERMISSION_DENIED` (owner UID in document must match authenticated UID).

### Payload 4: Arbitrary Admin Role Self-Promotion
* **Target Path**: `admins/attacker_uid` (Create)
* **Exploit Details**: An attacker attempts to create a registration document for themselves in the `admins` collection.
* **Payload**:
  ```json
  {
    "uid": "attacker_uid",
    "email": "attacker@gmail.com",
    "name": "Malicious Attacker",
    "role": "superadmin",
    "createdAt": "2026-05-29T07:13:33Z"
  }
  ```
* **Expected Result**: `PERMISSION_DENIED` (self-creation of admin documents must be closed; bootstrapped or manually written backend-only).

### Payload 5: Rogue Premium subscription Creation
* **Target Path**: `subscriptions/sub_spoof_123` (Create)
* **Exploit Details**: A basic user attempts to write their own positive subscription document directly via Client SDK.
* **Payload**:
  ```json
  {
    "subscriptionId": "sub_spoof_123",
    "userId": "attacker_uid",
    "planName": "Lifetime Elite Matrimony",
    "amount": 0,
    "status": "active",
    "startDate": "2026-05-29T07:13:33Z",
    "endDate": "2036-05-29T07:13:33Z",
    "paymentMethod": "None - Free Spoof"
  }
  ```
* **Expected Result**: `PERMISSION_DENIED` (write to subscriptions forbidden for standard users).

### Payload 6: Spam Notification Broadcast Injection
* **Target Path**: `notifications/notif_spoof_456` (Create)
* **Exploit Details**: A user attempts to push a broadcast warning notification to all matrimonials.
* **Payload**:
  ```json
  {
    "notificationId": "notif_spoof_456",
    "title": "SYSTEM MAINTENANCE",
    "body": "Send 1 ETH to avoid account deletion!",
    "target": "all",
    "createdAt": "2026-05-29T07:13:33Z"
  }
  ```
* **Expected Result**: `PERMISSION_DENIED` (writing public system notifications restricted to admins).

### Payload 7: Denial of Wallet ID Poisoning Resource Exhaustion
* **Target Path**: `users/some_extremely_long_junk_id_that_is_extremely_unreasonable_and_is_designed_to_bloat_firestore_indices_and_exhaust_the_entire_Spark_plan_free_tier` (Create)
* **Exploit Details**: Attacker injects a massive document ID containing shellcodes/unicode sequences.
* **Payload**:
  ```json
  {
    "uid": "attacker_uid",
    "name": "Evil",
    "email": "attacker@gmail.com",
    "status": "active",
    "isVerified": false,
    "membership": "free"
  }
  ```
* **Expected Result**: `PERMISSION_DENIED` (document ID fails character matches or exceeds max allowed size of 128 characters).

### Payload 8: Abuse Report Arbitrary Deletion & Cover-up
* **Target Path**: `reports/flagged_report_uid` (Delete)
* **Exploit Details**: A user flagged for abuse attempts to delete the report filed against them to cover up their spam.
* **Payload**: `{}`
* **Expected Result**: `PERMISSION_DENIED` (deleting reports is strictly a read-only workflow for admins; standard users can never delete reports).

### Payload 9: Hijack Active Match Message Sender UI
* **Target Path**: `messages/malicious_msg_1` (Create)
* **Exploit Details**: An attacker sends a message in a room while masquerading as the victim (spoofing `senderId` to be the victim's UID).
* **Payload**:
  ```json
  {
    "messageId": "malicious_msg_1",
    "chatId": "chat_room_987",
    "senderId": "victim_uid",
    "receiverId": "attacker_uid",
    "text": "I request to delete my profile immediately.",
    "createdAt": "2026-05-29T07:13:33Z"
  }
  ```
* **Expected Result**: `PERMISSION_DENIED` (`senderId` must strictly match the writer's authenticated `request.auth.uid`).

### Payload 10: Client Query Harvesting (Scraping list of private emails)
* **Target Path**: `users` (List query)
* **Exploit Details**: A guest or unverified user attempts a broad query to scrape and download user emails and contact details of all users.
* **Payload**: `getDocs(collection('users'))` without filtering by their own uid.
* **Expected Result**: `PERMISSION_DENIED` (blanket reads or non-isolated list queries are locked; queries must enforce security boundaries securely).

### Payload 11: Future/Past Fake Timestamp Tampering
* **Target Path**: `messages/tampered_msg_2` (Create)
* **Exploit Details**: Attacker attempts to backdate a message to pretend they replied hours ago, or forward-date to disrupt timelines.
* **Payload**:
  ```json
  {
    "messageId": "tampered_msg_2",
    "chatId": "chat_room_987",
    "senderId": "attacker_uid",
    "receiverId": "victim_uid",
    "text": "Sent 5 hours ago!",
    "createdAt": "1999-01-01T00:00:00Z"
  }
  ```
* **Expected Result**: `PERMISSION_DENIED` (`createdAt` must match `request.time`).

### Payload 12: Terminal State Bypass (Overwriting resolved abuse status)
* **Target Path**: `reports/flagged_report_uid` (Update)
* **Exploit Details**: Attacker attempts to change a resolved report status back to pending, or modify details of an official dispute.
* **Payload**:
  ```json
  {
    "status": "pending",
    "details": "Altered description of behavior"
  }
  ```
* **Expected Result**: `PERMISSION_DENIED` (only admins can write; updates on terminal keys or locked data must fail).

---

## 3. Test Runner Outline

The codebase should embed standard firebase rules checks, and we will verify compiling/deploying these rules.
All standard queries in dashboard will have custom scopes and catch handlers validating JSON errors using the custom `handleFirestoreError` function.
