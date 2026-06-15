# DHOBI METROMANI ADMIN PANEL • SYSTEM BINDING & SETUP GUIDE

This system guide outlines how the web-based Admin Panel connects with your Android application using Firebase Firestore, Cloud Messaging (FCM), and Authentication securely.

---

## 1. System Architecture & Real-Time Binding

The synchronization between the **Dhobi Metromani Android Application** and your **Web Admin Panel** happens natively in real-time through the **Firebase SDK**.

When an admin updates a profile or resolves an abuse complaint:
1. The Admin Web App writes to the shared Firestore database collection (e.g., setting a user's `isVerified: true` or `status: "blocked"`).
2. The Android mobile app, which is listening to its own profile document using standard real-time listeners (`onSnapshot` / `addSnapshotListener` in Android Kotlin), receives the instantaneous packet update.
3. The Android app automatically responds by locking/unlocking the screen, updating the verified star badge, or altering the chat messaging permissions.

---

## 2. Firestore Collections Schema Reference

### `users` (Documents: `users/{userId}`)
* `uid` (String): Candidate auth ID.
* `name` (String): Display matrimonial name.
* `email` (String): Registered email address.
* `phone` (String, Optional): Candidate mobile number.
* `gender` (String): `"male"` or `"female"`.
* `religion` (String): e.g., `"Hindu"`.
* `caste` (String): e.g., `"Dhobi"`.
* `age` (Number): Candidate age.
* `profilePhoto` (String): Profile avatar photo URL.
* `status` (String): `"active"` or `"blocked"`. Blocked accounts are immediately banned from matchmaking pools.
* `isVerified` (Boolean): Verification status. Verified users display a golden star badge.
* `membership` (String): `"free"` or `"premium"`.

### `admins` (Documents: `admins/{adminId}`)
* `uid` (String): Unique admin Auth ID.
* `email` (String): Admin's official google address.
* `name` (String): Admin's display name.
* `role` (String): `"superadmin"` or `"moderator"`.
* `createdAt` (Timestamp): Timestamp when admin record was created.

### `subscriptions` (Documents: `subscriptions/{subscriptionId}`)
* `subscriptionId` (String): Unique invoice transaction reference.
* `userId` (String): Referenced candidate UID.
* `planName` (String): Selected premium tier (e.g., "Dhobi Gold Premium Annual").
* `amount` (Number): Purchase amount paid in INR.
* `status` (String): `"active"` or `"expired"`.
* `startDate` (Timestamp): Activation timestamp.
* `endDate` (Timestamp): Expiration timestamp.

### `reports` (Documents: `reports/{reportId}`)
* `reportId` (String): Standard complaint ticket ID.
* `reporterId` (String): Accuser user UID.
* `reportedUserId` (String): Violator candidate UID.
* `type` (String): `"fake_profile"`, `"abuse"`, or `"spam"`.
* `details` (String): Plain text explanation of standard community flag violations.
* `status` (String): `"pending"`, `"resolved"`, or `"dismissed"`.

### `notifications` (Documents: `notifications/{notificationId}`)
* `notificationId` (String): Unique push transmission receipt.
* `title` (String): Push message title.
* `body` (String): Push message paragraph body.
* `target` (String): `"all"` or `"user"`.
* `targetUserId` (String, Optional): Target user’s UID.

---

## 3. Firebase Console Configuration Instructions

1. **Create Firebase Project**:
   * Navigate to the [Firebase Console](https://console.firebase.google.com/).
   * Click **Add Project** and name it e.g., `Dhobi Metromani`.

2. **Activate Search & Database Services**:
   * **Firestore Database**: Under Build menu, select **Firestore**, click **Create Database**, and select your region (e.g., `asia-east1`).
   * **Authentication**: Go to **Authentication** -> **Sign-in method**, add **Google** Auth provider, select your support email and click save. Enables authenticating admin operators out of the box.

3. **Register App Platforms**:
   * **Web Application (Admin Panel)**: Add a Web App, copy the `firebaseConfig` keys, and save them in standard client environments. (This app automatically generates this config dynamically inside `firebase-applet-config.json`!).
   * **Android Application**: Register your Android app package (e.g., `com.dhobimetromani.app`) and download the generated `google-services.json` config file. Place this file inside your Android app's `/app` folder.

---

## 4. Production Deployment Actions & Commands

To deploy this admin panel to production (hosted directly via **Firebase Hosting**):

### Step A: Install Firebase Tools CLI globally on your workspace
```bash
npm install -g firebase-tools
```

### Step B: Authenticate Firebase CLI with your Google credentials
```bash
firebase login
```

### Step C: Initialize Hosting Configurations
```bash
firebase init
```
* Select **Hosting** and **Firestore** using spacebar selection.
* Choose your existing project (e.g. `wise-gateway-kfbwx`).
* For public directory source, specify: `dist`
* Configure as a single-page app (SPA): **Yes**
* Autowrite `index.html` redirects: **No**

### Step D: Build the Application
```bash
npm run build
```
This runs Vite building your assets, compiles the Node.js Express server into `dist/server.cjs` securely bundling backend properties using `esbuild`.

### Step E: Dispatch and Deploy Security Rules + Dynamic Hosting
```bash
# Deploy Firestore security structures
firebase deploy --only firestore:rules

# Deploy compiled production static files to Firebase servers
firebase deploy --only hosting
```

---

## 5. Security Rules Framework (`firestore.rules`)

The system embeds custom security policies protecting access from rogue accounts. The configuration includes:
* **Bootstrapping Admin**: Grants automatic bypass authentication to your main administrator email: `ROHITPARMAR708@gmail.com`.
* **Private PII Isolation**: Guarantees that sensitive profile fields are only queryable by verified admins or the target profile owner.
* **State Immutability Gates**: Prevents basic clients from modifying premium flags (`membership`), self-verifying profiles, or altering dispute resolutions.
