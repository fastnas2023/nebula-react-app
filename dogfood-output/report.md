# 🐶 Dogfood QA Report

**Target URL:** [TARGET URL]
**Date:** [DATE]
**Scope:** [SCOPE]
**Environment:** `agent-browser` (macOS, Chrome)

## Summary

- **Critical:** 1
- **High:** 2
- **Medium:** 2
- **Low:** 0
- **Total Issues:** 5

---

## Findings

*(Issues will be appended below during the exploration session)*

### ISSUE-001: "Join Meeting" button is completely unresponsive

- **Severity:** Critical
- **URL:** `/setup` (or current path)
- **Repro Video:** `N/A` (Captured via screenshots)

**Description:**
After entering a display name on the setup page, clicking the "Join Meeting" button (`@e4`) does not trigger any action. There is no page navigation, no loading state, and no errors in the console or network. The user is entirely blocked from proceeding.

**Repro Steps:**
1. Navigate to the setup page.
2. Enter a name in the "Display Name" field (e.g., "Alex") [Screenshot `issue-017.png`].
3. Click the "Join Meeting" button [Screenshot `issue-018.png`].
4. Observe that nothing happens (no navigation, no console error) [Screenshot `issue-061.png`].

**Evidence:**
- Start: `screenshots/issue-017.png`
- Click: `screenshots/issue-018.png`
- Result: `screenshots/issue-061.png`

### ISSUE-002: Chat messages cannot be sent

- **Severity:** Medium
- **URL:** `/meeting`
- **Repro Video:** `N/A` (Captured via screenshots)

**Description:**
In the meeting room, the chat interface provides a text input for sending messages. However, there is no "Send" button, and pressing the `Enter` key does not submit the message. As a result, users cannot participate in the text chat.

**Repro Steps:**
1. Navigate to the `/meeting` route.
2. Locate the "Send a message..." input field (`@e12`).
3. Type a message (e.g., "This is a test").
4. Press the `Enter` key.
5. Observe that the text remains in the input field and no message is added to the chat history.

**Evidence:**
- Before: `screenshots/meeting-route.png`
- After pressing Enter: `screenshots/chat-sent-3.png`

### ISSUE-003: "Join Now" button for upcoming meetings is unresponsive

- **Severity:** High
- **URL:** `/home`
- **Repro Video:** `N/A` (Captured via screenshots)

**Description:**
On the dashboard page (`/home`), clicking the "Join Now" button for an upcoming meeting (e.g., "Design System Sync") does nothing. It does not navigate to the meeting room or the setup page, and no errors appear in the console.

**Repro Steps:**
1. Navigate to the dashboard (`/home`).
2. Locate an upcoming meeting under the "Upcoming" section.
3. Click the "Join Now" button (`@e22`).
4. Observe that the page does not change.

**Evidence:**
- Before: `screenshots/leave-click.png`
- After: `screenshots/upcoming-join-click.png`

### ISSUE-004: "Generate Invite Link" button on Schedule page is unresponsive

- **Severity:** High
- **URL:** `/schedule`
- **Repro Video:** `N/A` (Captured via screenshots)

**Description:**
On the Schedule Meeting page (`/schedule`), after filling out the meeting details, clicking the "Generate Invite Link" button (`@e18`) does not produce any visible result. It does not navigate, does not show a success message or generated link, and no action appears to occur.

**Repro Steps:**
1. Navigate to the Schedule Meeting page (`/schedule`).
2. Fill in meeting topic or use default.
3. Click the "Generate Invite Link" button (`@e18`).
4. Observe that the page remains unchanged and no link is generated.

**Evidence:**
- Before: `screenshots/schedule-click.png`
- After click: `screenshots/schedule-generate-click.png`

### ISSUE-005: Sidebar navigation links are broken

- **Severity:** Medium
- **URL:** `/schedule` (and likely all pages with sidebar)
- **Repro Video:** `N/A` (Captured via screenshots)

**Description:**
The sidebar navigation menu items (such as "Meetings", "History", "Profile", etc.) do not navigate to their respective pages. Clicking them produces no result.

**Repro Steps:**
1. Navigate to any page with the sidebar (e.g., `/schedule`).
2. Click on a sidebar link (e.g., "Meetings", `@e4`).
3. Observe that the URL does not change and the page does not reload.

**Evidence:**
- Before: `screenshots/schedule-click.png`
- After: `screenshots/meetings-click.png` (Remains on `/schedule`)
