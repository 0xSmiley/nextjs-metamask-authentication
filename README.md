# Next.js MetaMask Authentication Example

This repository demonstrates how to authenticate users with MetaMask in a Next.js application.

## Getting Started

To run the project locally:
```
npm install
npm run dev
```

## Endpoints

### /nonce
Method: GET
Description: Generates a nonce that the user needs to sign with their MetaMask wallet.

### /verify
Method: POST
Description: Verifies the signed nonce to authenticate the user.

### /me
Method: GET
Description: Confirms the session and returns the authenticated user's wallet address.

### /logout
Method: POST
Description: Destroys the current user session.

## Reference
https://1.x.wagmi.sh/examples/sign-in-with-ethereum
