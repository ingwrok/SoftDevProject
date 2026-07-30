<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS Pet Store API Demo (Prism-ready)

A complete and robust NestJS Pet Store API demonstration project featuring automated Swagger OpenAPI documentation, strict request validation, unit tests, and E2E integration tests.

---

## ✨ Features

- **Pet CRUD Endpoints**: Create, Read, Update, and Delete pets in a pre-seeded in-memory store.
- **Strict Validation**: Utilizes `class-validator` and `class-transformer` pipes to reject invalid request bodies (e.g. unknown properties, wrong enum status, missing fields).
- **Automated OpenAPI Spec**: Configures `@nestjs/swagger` at `/docs` and automatically outputs a static `openapi.json` to the project root on every server start.
- **Testing**: Pre-configured Jest test suites containing unit tests for the controller & service, plus end-to-end integration tests.
- **Linting & Formatting**: Configured with strict TypeScript ESLint rules and Prettier formatting.

---

## 📁 Key File Structure

- [src/main.ts](file:///D:/class-demo/prism-demo/src/main.ts) — Configures validation pipes, mounts Swagger at `/docs`, and writes `openapi.json`.
- [src/pets/pets.controller.ts](file:///D:/class-demo/prism-demo/src/pets/pets.controller.ts) — Routes and OpenAPI request/response schema specifications.
- [src/pets/pets.service.ts](file:///D:/class-demo/prism-demo/src/pets/pets.service.ts) — CRUD business logic and database seed.
- [src/pets/entities/pet.entity.ts](file:///D:/class-demo/prism-demo/src/pets/entities/pet.entity.ts) — Defines the `Pet` model with Swagger annotations.
- [src/pets/dto/create-pet.dto.ts](file:///D:/class-demo/prism-demo/src/pets/dto/create-pet.dto.ts) — Rules for validating create-pet payloads.
- [test/pets.e2e-spec.ts](file:///D:/class-demo/prism-demo/test/pets.e2e-spec.ts) — HTTP assertion tests for validations, responses, and routes.
- [openapi.json](file:///D:/class-demo/prism-demo/openapi.json) — The auto-generated OpenAPI specification file.

---

## 🚀 Running the Project

### 📦 Installation

To install dependencies:
```bash
npm install
```

### 🏃 Start the Server
```bash
# development mode
npm run start

# watch mode (auto-reload on edits)
npm run start:dev
```
* **Swagger UI Docs**: Accessible at http://localhost:3000/docs
* **API Specification**: Automatically saves to the root of the project as `openapi.json` whenever the server starts.

### 🌐 Stoplight Prism Mock Server

[Stoplight Prism](https://stoplight.io/open-source/prism) is an open-source mock server that can automatically spin up a mock API server based on your OpenAPI specification ([openapi.json](file:///D:/class-demo/prism-demo/openapi.json)). It validates incoming requests against the API schema and returns mock responses.

### 📦 Running the Mock Server

You can run the mock server using the pre-configured script or directly with `npx`:

```bash
# Option A: Run using the package npm script
npm run mock

# Option B: Run directly using npx
npx -y @stoplight/prism-cli mock openapi.json
```

By default, the server will start at `http://127.0.0.1:4010`.

### 🧪 Testing Endpoints

Once Prism is running, you can interact with it using `curl`, Postman, or any HTTP client:

#### 📋 Get All Pets
```bash
curl -i http://127.0.0.1:4010/pets
```

#### ➕ Create a Pet (Valid Payload)
```bash
curl -i -X POST http://127.0.0.1:4010/pets \
  -H "Content-Type: application/json" \
  -d '{"name": "Milo", "status": "available"}'
```

#### ❌ Create a Pet (Invalid Payload - Fails Validation)
Prism checks request parameters and bodies against the schemas in `openapi.json`. Sending an invalid request will trigger validation errors:
```bash
curl -i -X POST http://127.0.0.1:4010/pets \
  -H "Content-Type: application/json" \
  -d '{"name": "", "status": "unknown-status"}'
```

### ⚙️ Advanced Mocking Features

* **Dynamic Responses**: By default, Prism returns static values from the examples defined in the OpenAPI spec. To generate mock data dynamically based on property types, start Prism with the `--dynamic` (or `-d`) flag:
  ```bash
  npx @stoplight/prism-cli mock openapi.json -d
  ```
  Alternatively, request dynamic responses on individual requests by sending the `Prefer: dynamic=true` header.

* **Port Customization**: To run the mock server on a different port (e.g. `5000`):
  ```bash
  npx @stoplight/prism-cli mock openapi.json -p 5000
  ```

* **Force Specific HTTP Status Codes**: You can instruct Prism to return specific HTTP status codes by sending the `Prefer` header in your requests:
  ```bash
  # Force a 400 Bad Request
  curl -i -H "Prefer: code=400" http://127.0.0.1:4010/pets

  # Force a 500 Internal Server Error
  curl -i -H "Prefer: code=500" http://127.0.0.1:4010/pets
  ```

---

## 🛡️ Stoplight Prism as an API Validator (Proxy Mode)

Stoplight Prism can also act as a **validating reverse proxy**. In this mode, Prism sits in front of your live running NestJS server (`http://localhost:3000`), validates all incoming requests and outgoing responses against the OpenAPI specification ([openapi.json](file:///D:/class-demo/prism-demo/openapi.json)), and forwards valid traffic.

This is extremely useful for:
* **Contract Testing**: Ensuring your backend implementation actually conforms to the OpenAPI specification.
* **Front-end / Integration Testing**: Catching request payload or query parameter violations early before they reach your backend logic.

### 📦 Running the Validator Proxy

First, make sure your NestJS development server is running:
```bash
npm run start:dev
```

Then, start the Prism proxy pointing to your live server:
```bash
# Option A: Run using the package npm script
npm run proxy

# Option B: Run directly using npx
npx -y @stoplight/prism-cli proxy openapi.json http://localhost:3000
```

By default, the proxy server will listen at `http://127.0.0.1:4010` and forward traffic to `http://localhost:3000`.

### 🛡️ Validation Modes

#### 📝 1. Passive Logging (Default)
By default, if you send an invalid request (e.g. status value not in the enum or wrong schema), Prism will still forward the request to NestJS but will log the validation warnings in the CLI output. It also appends the violation details to the response headers under `sl-violations`.

#### 🚫 2. Strict Validation (Reject Violations)
To force Prism to reject invalid requests/responses with an error status (like `422 Unprocessable Entity` or `500 Internal Server Error`) instead of forwarding them, start the proxy with the `--errors` flag:
```bash
npx @stoplight/prism-cli proxy openapi.json http://localhost:3000 --errors
```

### 🧪 Testing Validation

With the NestJS server running at port 3000 and the Prism proxy running at port 4010 with the `--errors` flag:

#### 📋 Valid Request (Succeeds)
```bash
curl -i http://127.0.0.1:4010/pets
```
*Response is forwarded to NestJS, and the list of pets is returned successfully.*

#### ❌ Invalid Request (Blocked by Prism Proxy)
Send a request with an invalid status query parameter:
```bash
curl -i "http://127.0.0.1:4010/pets?status=invalid-status"
```
*Prism will block this request and return a 422 validation error because `invalid-status` is not in the OpenAPI allowed enum (`available`, `pending`, `sold`).*

---

### 💡 Testing Response Validation (Troubleshooting & Gotchas)

If you modify your NestJS response body (e.g. adding new fields or changing return types) but do not see a validation error from Prism, check the following:

#### 1. Are you running the `mock` server instead of the `proxy`?
* **If running `npm run mock`**: Prism generates mock responses directly from `openapi.json` and bypasses NestJS entirely. Changing NestJS code has no effect.
* **Fix**: Ensure NestJS is running on port `3000` (`npm run start:dev`) and query the proxy on port `4010` running in validation mode:
  ```bash
  npm run proxy:validate
  ```

#### 2. Are you running the proxy without strict validation?
* If you run `npm run proxy`, Prism will log warnings to the terminal but will still return a successful `200` status.
* **Fix**: Run the strict validation script:
  ```bash
  npm run proxy:validate
  ```

#### 3. Is the property documented in your OpenAPI spec?
* If you add a new property in your TypeScript model (like `flag?: boolean;`), it **will not** be validated unless it has the `@ApiProperty()` decorator. NestJS Swagger ignores properties without `@ApiProperty()`.
* Furthermore, by default OpenAPI permits extra/undocumented properties. Returning undocumented fields will not cause a validation error unless you configure `additionalProperties: false` in the schema.

#### 4. How to force a Response Validation Failure (Step-by-Step):
To verify that response validation is working correctly:
1. Open [src/pets/pets.service.ts](file:///D:/class-demo/prism-demo/src/pets/pets.service.ts) and temporarily change the seed data's status to an invalid value (which violates the documented `PetStatus` enum):
   ```typescript
   // In seedPets():
   status: "invalid-status-value" as any,
   ```
2. Restart the NestJS server.
3. Start the Prism proxy in strict mode:
   ```bash
   npm run proxy:validate
   ```
4. Query the proxy:
   ```bash
   curl -i http://127.0.0.1:4010/pets
   ```
5. **Expected Result**: Prism will block the response and return an HTTP `500 Internal Server Error` (instead of 200) because the server's response violates the schema contract.

---

## 🧪 Testing

Both E2E and unit tests are configured and verified:

```bash
# Run unit tests
npm run test

# Run end-to-end (E2E) integration tests
npm run test:e2e
```

---

## 🧹 Linting and Formatting

To run the linter and format code:
```bash
# Run ESLint check
npm run lint

# Auto-format codebase using Prettier
npm run format
```

---

## 📄 License
This project is MIT licensed.
