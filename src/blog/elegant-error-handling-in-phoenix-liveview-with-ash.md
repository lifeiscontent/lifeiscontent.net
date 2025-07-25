---
title: 'Elegant Error Handling in Phoenix LiveView with Ash'
date: '2025-04-09'
author: 'Aaron Reisman'
tags: ['phoenix', 'liveview', 'ash', 'error-handling']
---

# Elegant Error Handling in Phoenix LiveView with Ash

Effective error handling is crucial for web applications, directly affecting user experience and reliability. In this post, I'll show you how to implement clean and effective error handling for 404, 403, and 500 errors in a Phoenix LiveView application using Ash Framework.

## The Problem

When using Phoenix and Ash Framework, you might encounter the frustrating error: `no view was found for the format: 'html'`. This usually occurs when your app hits an error without a properly configured error handler.

Initially, I attempted a custom `ErrorController`, only to realize Ash Framework already handles exceptions elegantly through the [Plug Exception protocol](https://hexdocs.pm/plug/Plug.Exception.html). Understanding this made my solution significantly simpler and cleaner.

## Configuring Elegant Error Handling

Phoenix offers built-in tools to streamline error handling. Here’s the step-by-step approach I followed to seamlessly integrate error handling into my Ash-powered LiveView app:

### 1. Configure the Endpoint

In your `config/config.exs`, configure Phoenix to use custom templates:

```elixir
config :my_app, MyAppWeb.Endpoint,
  render_errors: [
    formats: [html: MyAppWeb.ErrorHTML, json: MyAppWeb.ErrorJSON],
    layout: {MyAppWeb.Layouts, :error}
  ]
```

This directs Phoenix to use `MyAppWeb.ErrorHTML` and `MyAppWeb.ErrorJSON` for rendering error pages.

### 2. Custom Error Layout

Create a dedicated error layout in `lib/my_app_web/components/layouts/error.html.heex`:

```heex
<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <title>{Phoenix.Controller.status_message_from_template(\"#{@status}.html\")} · MyApp</title>
</head>
<body>
  <main>
    {@inner_content}
  </main>
</body>
</html>
```

The key here is the dynamic title generation based on the error status code.

### 3. Custom Error Templates

Define custom templates clearly communicating each error:

**404 Template (`lib/my_app_web/controllers/error_html/404.html.heex`):**

```heex
<section>
  <h1>{@status}</h1>
  <p>{Phoenix.Controller.status_message_from_template(\"#{@status}.html\")}</p>
  <p>Sorry, the page you're looking for doesn't exist or has moved.</p>
  <.link href=\"/\">Return to Home</.link>
</section>
```

**500 Template:**

```heex
<section>
  <p>{Phoenix.Controller.status_message_from_template(\"#{@status}.html\")}</p>
  <p>Something went wrong on our end. We're on it!</p>
</section>
```

**403 Template:**

```heex
<section>
  <p>{Phoenix.Controller.status_message_from_template(\"#{@status}.html\")}</p>
  <p>You don't have permission to access this resource.</p>
</section>
```

### 4. Error HTML Module

Use the standard Phoenix error HTML module, embedding your custom templates:

```elixir
defmodule MyAppWeb.ErrorHTML do
  use MyAppWeb, :html
  embed_templates "error_html/*"

  def render(template, _assigns) do
    Phoenix.Controller.status_message_from_template(template)
  end
end
```

## Leveraging Ash's Bang Methods

Ash Framework integrates neatly by raising exceptions through its \"bang\" methods (like `Ash.read!`). These exceptions trigger Phoenix’s built-in error handling automatically:

```elixir
def mount(%{"id" => id}, _session, socket) do
  post = MyApp.Content.get_post!(id, actor: socket.assigns.current_user)
  {:ok, assign(socket, :post, post)}
end
```

If the resource doesn't exist or access is denied, Ash raises an exception that Phoenix gracefully catches, rendering the appropriate custom error template.

For more details, check Ash's [Plug Exception implementation](https://github.com/ash-project/ash_phoenix/blob/main/lib/ash_phoenix/plug/exception.ex).

## Practical Examples

**Not Found (404):**

```elixir
def handle_event("view_post", %{"id" => id}, socket) do
  post = MyApp.Content.get_post!(id, actor: socket.assigns.current_user)
  {:noreply, push_navigate(socket, to: ~p"/posts/#{post.id}")}
end
```

**Forbidden (403):**

```elixir
def handle_event("comment_on_post", params, socket) do
  MyApp.Content.create_comment!(params, actor: socket.assigns.current_user)
  {:noreply, put_flash(socket, :info, "Comment added!")}
end
```

**Server Error (500):**

```elixir
def assign_posts(socket) do
  try do
    posts = MyApp.Content.list_posts!(actor: socket.assigns.current_user)
    assign(socket, :posts, posts)
  rescue
    error ->
      Logger.error("Error loading posts: #{inspect(error)}")
      raise error
  end
end
```

## Best Practices Learned

- **Simple and clear messages:** Inform users without technical jargon.
- **Guidance:** Always offer clear navigation or next steps.
- **Visual Consistency:** Make error pages feel part of your app.
- **Logging:** Log detailed errors server-side for debugging.
- **Centralize logic:** Define error handling once and reuse throughout.

## Why This Approach Works

- **Plug Exception Protocol:** Ash errors translate seamlessly to HTTP status codes.
- **Format-aware rendering:** Phoenix automatically handles HTML and JSON requests correctly.
- **Dynamic Templates:** Easy customization based on status codes.

## Key Benefits

- **User-friendly pages** that match your app's branding
- **Accurate HTTP status codes** for HTML and API responses
- **Reduced complexity** with built-in Phoenix mechanisms
- **Cleaner, maintainable codebase**

## Conclusion

Robust error handling doesn't have to be complicated. By leveraging Phoenix’s built-in error handling and Ash's Plug Exception integration, you can create intuitive, attractive error pages with minimal effort.

Have you tackled custom error handling in your Phoenix app? I'd love to hear your approach!
