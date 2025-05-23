---
title: "Understanding Protocols in Elixir: A Practical Guide"
date: 2024-11-10
tags:
  - Elixir
  - Protocols
  - Functional Programming
  - Polymorphism
---
# Understanding Protocols in Elixir: A Practical Guide

Elixir protocols provide a powerful way to implement polymorphism in a functional language. Unlike object-oriented languages that use inheritance, Elixir uses protocols to define behaviors that can be implemented by different data types. This guide will show you how to use protocols effectively in your Elixir applications.

## What Are Protocols and Why Use Them?

At their core, protocols are a way to implement polymorphic behavior in Elixir. They allow you to:

1. Define a consistent interface across different data types
2. Extend functionality for types you don't control
3. Write more generic and reusable code

Protocols solve a fundamental problem: how to make functions behave differently depending on the data type they receive, without resorting to complex conditional logic.

## The Problem: Type-Based Behavior Without Protocols

Without protocols, you might handle different types using pattern matching and guard clauses:

```elixir
defmodule Formatter do
  def stringify(value) when is_binary(value), do: "String: #{value}"
  def stringify(value) when is_integer(value), do: "Integer: #{value}"
  def stringify(value) when is_list(value), do: "List with #{length(value)} items"
  # More clauses for other types...
end
```

This approach has two major drawbacks:

1. **Centralized Code**: Every time you need to support a new type, you must modify the original module
2. **Limited Extensibility**: You can't easily add behavior for types defined in third-party libraries

## The Solution: Protocols

Here's how to solve the same problem using protocols:

```elixir
# 1. Define the protocol with the functions you want to implement
defprotocol Formatter do
  @doc "Converts the value to a formatted string"
  def stringify(value)
end

# 2. Implement the protocol for each type
defimpl Formatter, for: BitString do
  def stringify(value), do: "String: #{value}"
end

defimpl Formatter, for: Integer do
  def stringify(value), do: "Integer: #{value}"
end

defimpl Formatter, for: List do
  def stringify(value), do: "List with #{length(value)} items"
end
```

Using the protocol is simple:

```elixir
iex> Formatter.stringify("hello")
"String: hello"
iex> Formatter.stringify(42)
"Integer: 42"
iex> Formatter.stringify([1, 2, 3])
"List with 3 items"
```

The key advantage: anyone can add implementations for new types without modifying the original protocol.

## A Practical Example: The Size Protocol

Let's create a practical example with a `Size` protocol that works consistently across different data types:

```elixir
defprotocol Size do
  @doc "Returns the size of a data structure"
  def size(data)
end

# Implementation for strings (measures bytes)
defimpl Size, for: BitString do
  def size(string), do: byte_size(string)
end

# Implementation for maps
defimpl Size, for: Map do
  def size(map), do: map_size(map)
end

# Implementation for tuples
defimpl Size, for: Tuple do
  def size(tuple), do: tuple_size(tuple)
end
```

Using the protocol:

```elixir
iex> Size.size("hello")  # String (5 bytes)
5
iex> Size.size({:a, :b, :c})  # Tuple (3 elements)
3
iex> Size.size(%{a: 1, b: 2})  # Map (2 key-value pairs)
2
```

If you try to use the protocol with a type that doesn't implement it:

```elixir
iex> Size.size([1, 2, 3])
** (Protocol.UndefinedError) protocol Size not implemented for [1, 2, 3]
```

## Working with Structs

Structs are where protocols become especially powerful. In Elixir, structs are their own types, so they need their own protocol implementations.

### Creating a Custom Struct

```elixir
defmodule User do
  defstruct [:name, :email, :roles]
end

# Implement the Size protocol for User
defimpl Size, for: User do
  def size(%User{roles: roles}) when is_list(roles) do
    # Size is determined by number of roles
    length(roles)
  end
  
  def size(_user), do: 1  # Default size
end
```

Using it:

```elixir
iex> user = %User{name: "Alice", email: "alice@example.com", roles: ["admin", "editor"]}
iex> Size.size(user)
2  # Number of roles
```

### Working with Existing Structs

You can implement protocols for structs from libraries too:

```elixir
# Implement Size for MapSet
defimpl Size, for: MapSet do
  def size(set), do: MapSet.size(set)
end

iex> set = MapSet.new([1, 2, 3, 4])
iex> Size.size(set)
4
```

## Default Implementations with `Any`

Implementing a protocol for every possible type can be tedious. Elixir offers two ways to provide default implementations:

### 1. Using `@fallback_to_any`

You can make your protocol fall back to a default implementation when a specific one isn't available:

```elixir
defprotocol Size do
  @fallback_to_any true  # Enable fallback
  def size(data)
end

# Default implementation for any type
defimpl Size, for: Any do
  def size(_), do: 1  # Default size is 1
end
```

Now any type without a specific implementation will return 1.

### 2. Using `@derive`

For your own structs, you can derive the implementation from Any:

```elixir
defmodule Product do
  @derive [Size]  # Use the Any implementation
  defstruct [:name, :price]
end

iex> product = %Product{name: "Widget", price: 19.99}
iex> Size.size(product)
1  # Uses the Any implementation
```

This approach keeps your code cleaner by avoiding repetitive implementations.

## Built-in Protocols in Elixir

Elixir includes several important protocols that you'll use regularly:

### 1. `String.Chars` - String Conversion

This protocol powers the `to_string/1` function and string interpolation:

```elixir
iex> to_string(42)
"42"

iex> name = "Alice"
iex> "Hello, #{name}!"
"Hello, Alice!"
```

Not all types implement this protocol:

```elixir
iex> to_string({:a, :b})
** (Protocol.UndefinedError) protocol String.Chars not implemented for {:a, :b}
```

### 2. `Inspect` - Debug Representation

The `inspect/1` function uses this protocol to create string representations for debugging:

```elixir
iex> inspect({:a, :b})
"{:a, :b}"

# Works with any data type
iex> "Debug: #{inspect(%{complex: [:data, {:structure}]})}"
"Debug: %{complex: [:data, {:structure}]}"
```

### 3. `Enumerable` - Collection Operations

This protocol enables the `Enum` module functions to work with different collection types:

```elixir
# Works with lists
iex> Enum.map([1, 2, 3], fn x -> x * 2 end)
[2, 4, 6]

# Works with maps
iex> Enum.map(%{a: 1, b: 2}, fn {k, v} -> {k, v * 2} end)
[a: 2, b: 4]

# Works with ranges
iex> Enum.sum(1..10)
55
```

## Conclusion

Protocols are a powerful feature in Elixir that enable:

1. **Polymorphism** - Write functions that work with multiple data types
2. **Extensibility** - Add behavior to types without modifying their original code
3. **Clean interfaces** - Define clear contracts for how types should behave

When designing your Elixir applications, consider using protocols when you need behavior that varies by type or when you want to create extensible interfaces.

By mastering protocols, you'll write more flexible, maintainable Elixir code that follows the language's functional design principles.