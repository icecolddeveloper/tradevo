## FieldWrapper.jsx Note -----> Dynamic Form Pattern

Core idea:
When you map over an array like `formFields`, that array becomes the source of truth for how EACH INPUT is created.

```js
formFields.map((fieldObj) => {
  ...
})
```

Each `fieldObj` represents one field configuration (name, email, password, etc.).

---

my State structure:

```js
form = {
  name: '',
  email: '',
  password: '',
  confirm: '',
};
```

To access or update a field dynamically, use bracket notation:

```js
form[fieldObj.id];
```

---

Why bracket notation works:
`fieldObj.id` returns a string like `"email"`.

So:

```js
form[fieldObj.id];
```

Becomes:

```js
form["email"] → form.email
```

---

Standard pattern for inputs:

```js
value={form[fieldObj.id]}

onChange={(e) =>
  setForm({
    ...form,
    [fieldObj.id]: e.target.value
  })
}
```

---

Password toggle pattern:

Each field (e.g. password & confirm) controls its own visibility state:

```js
setShowPassword((prev) => ({
  ...prev,
  [fieldObj.id]: !prev[fieldObj.id],
}));
```

---

Picture the loop like this:

i = 0 → fieldObj.id = "name"
i = 1 → fieldObj.id = "email"
i = 2 → fieldObj.id = "password"
i = 3 → fieldObj.id = "confirm"

So during each iteration:

iteration 2 ("password"):

```js
setShowPassword({
  ...prev,
  password: !prev.password
});

iteration 3 ("confirm"):
setShowPassword({
  ...prev,
  confirm: !prev.confirm
});
```

Each input only updates its own slice of state using its id.
