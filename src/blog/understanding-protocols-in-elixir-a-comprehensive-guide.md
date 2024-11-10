---
title: "Understanding Protocols in Elixir: A Comprehensive Guide"
date: 2024-11-10
tags:
  - Elixir
  - Protocols
  - Functional Programming
  - Polymorphism
  - Elixir Tutorials
  - Elixir Protocols
  - Structs in Elixir
  - Elixir Programming
  - Software Development
  - Programming Languages
  - Code Examples
  - Elixir Guide
  - Advanced Elixir
  - Enumerable Protocol
  - String.Chars Protocol
  - Inspect Protocol
  - Elixir Tips
  - Elixir Best Practices
  - Elixir Polymorphism
  - Elixir Structs
  ---
# Understanding Protocols in Elixir: A Comprehensive Guide

Elixir is a dynamic, functional language designed for building scalable and maintainable applications. One of its powerful features is **protocols**, which provide a mechanism to achieve polymorphism based on data types. In this tutorial, we'll dive deep into what protocols are, why they are useful, and how to implement them effectively in your Elixir projects.

## Table of Contents

- [Introduction to Protocols](#introduction-to-protocols)
- [The Problem with Pattern Matching and Guard Clauses](#the-problem-with-pattern-matching-and-guard-clauses)
- [How Protocols Solve the Problem](#how-protocols-solve-the-problem)
- [Implementing a Basic Protocol](#implementing-a-basic-protocol)
- [An In-Depth Example: The `Size` Protocol](#an-in-depth-example-the-size-protocol)
- [Protocols and Structs](#protocols-and-structs)
- [Implementing `Any` and Protocol Fallbacks](#implementing-any-and-protocol-fallbacks)
  - [Deriving Protocol Implementations](#deriving-protocol-implementations)
  - [Fallback to `Any`](#fallback-to-any)
- [Built-in Protocols in Elixir](#built-in-protocols-in-elixir)
- [Conclusion](#conclusion)

## Introduction to Protocols

In object-oriented languages, polymorphism allows objects of different types to be treated as objects of a common super-type. Elixir, being a functional language, achieves polymorphism through protocols. Protocols define a set of functions that can be implemented by different data types, allowing you to write generic code that works with any data type that implements the protocol.

## The Problem with Pattern Matching and Guard Clauses

Suppose you have a utility module that determines the type of a given input. You might implement it using pattern matching and guard clauses:

```elixir
defmodule Utility do
  def type(value) when is_binary(value), do: "string"
  def type(value) when is_integer(value), do: "integer"
  # ... other implementations ...
end
```

While this works, it has limitations:

- **Maintenance Overhead**: You need to continuously modify the `Utility` module to add support for new data types.
- **Lack of Extensibility**: If this module is part of a shared library or dependency, extending its functionality without modifying the original source becomes problematic.

## How Protocols Solve the Problem

Protocols allow us to define a common interface that can be implemented by any data type, even those defined outside your project. This means:

- **Extensibility**: Anyone can implement the protocol for new data types without modifying the original protocol definition.
- **Polymorphism**: Functions can operate on any data type that implements the protocol, making your code more generic and reusable.

## Implementing a Basic Protocol

Here's how you can rewrite the `Utility.type/1` functionality using protocols:

```elixir
defprotocol Utility do
  @spec type(t) :: String.t()
  def type(value)
end

defimpl Utility, for: BitString do
  def type(_value), do: "string"
end

defimpl Utility, for: Integer do
  def type(_value), do: "integer"
end
```

In this code:

- `defprotocol` defines a protocol with a function `type/1`.
- `defimpl` provides implementations of the protocol for specific data types (`BitString` and `Integer`).

Usage remains straightforward:

```elixir
iex> Utility.type("foo")
"string"
iex> Utility.type(123)
"integer"
```

## An In-Depth Example: The `Size` Protocol

Elixir differentiates between `length` and `size`:

- `length`: Computed by traversing the data structure (e.g., `length(list)`).
- `size`: Pre-computed and stored within the data structure (e.g., `tuple_size(tuple)`).

Let's create a `Size` protocol for data types where size is pre-computed.

### Protocol Definition

```elixir
defprotocol Size do
  @doc "Calculates the size (not the length) of a data structure"
  def size(data)
end
```

### Implementing the Protocol

```elixir
defimpl Size, for: BitString do
  def size(string), do: byte_size(string)
end

defimpl Size, for: Map do
  def size(map), do: map_size(map)
end

defimpl Size, for: Tuple do
  def size(tuple), do: tuple_size(tuple)
end
```

We haven't implemented `Size` for lists because their size isn't pre-computed.

### Using the Protocol

```elixir
iex> Size.size("foo")
3
iex> Size.size({:ok, "hello"})
2
iex> Size.size(%{label: "some label"})
1
```

Attempting to use the protocol with an unsupported data type raises an error:

```elixir
iex> Size.size([1, 2, 3])
** (Protocol.UndefinedError) protocol Size not implemented for [1, 2, 3] of type List
```

### Supported Data Types

You can implement protocols for all Elixir data types:

- `Atom`
- `BitString`
- `Float`
- `Function`
- `Integer`
- `List`
- `Map`
- `PID`
- `Port`
- `Reference`
- `Tuple`

## Protocols and Structs

The real power of protocols shines when used with structs. Structs in Elixir are maps with a fixed set of fields, but they don't share protocol implementations with maps.

For example, consider `MapSet`, which is a struct:

```elixir
iex> Size.size(%{})
0
iex> set = MapSet.new()
#MapSet<[]>
iex> Size.size(set)
** (Protocol.UndefinedError) protocol Size not implemented for #MapSet<[]> of type MapSet (a struct)
```

### Implementing Protocols for Structs

Since `MapSet` doesn't automatically implement `Size`, we need to define it:

```elixir
defimpl Size, for: MapSet do
  def size(set), do: MapSet.size(set)
end
```

Now, you can use `Size.size/1` with a `MapSet`:

```elixir
iex> Size.size(MapSet.new([1, 2, 3]))
3
```

You can also define custom semantics for your own structs:

```elixir
defmodule User do
  defstruct [:name, :age]
end

defimpl Size, for: User do
  def size(_user), do: 2
end
```

## Implementing `Any` and Protocol Fallbacks

Implementing protocols for every data type can become tedious. Elixir provides two options to simplify this:

- **Deriving Protocol Implementations**
- **Fallback to `Any`**

### Deriving Protocol Implementations

First, implement the protocol for `Any`:

```elixir
defimpl Size, for: Any do
  def size(_), do: 0
end
```

Then, use the `@derive` attribute in your struct to derive the protocol implementation:

```elixir
defmodule OtherUser do
  @derive [Size]
  defstruct [:name, :age]
end
```

Now, `OtherUser` automatically implements `Size` based on the `Any` implementation.

### Fallback to `Any`

Alternatively, you can set `@fallback_to_any` in your protocol definition:

```elixir
defprotocol Size do
  @fallback_to_any true
  def size(data)
end
```

With `@fallback_to_any` set to `true`, any data type that doesn't have an explicit implementation will use the `Any` implementation.

**Note**: Use this feature judiciously. The `Any` implementation may not make sense for all data types, and implicit behavior can lead to unexpected results.

## Built-in Protocols in Elixir

Elixir comes with several built-in protocols that are essential for everyday programming.

### The `Enumerable` Protocol

The `Enumerable` protocol allows data structures to be iterated over. It's the foundation for the `Enum` module functions:

```elixir
iex> Enum.map([1, 2, 3], fn x -> x * 2 end)
[2, 4, 6]
iex> Enum.reduce(1..3, 0, fn x, acc -> x + acc end)
6
```

### The `String.Chars` Protocol

This protocol specifies how to convert a data structure to a human-readable string, used by the `to_string/1` function:

```elixir
iex> to_string(:hello)
"hello"
```

String interpolation relies on `String.Chars`:

```elixir
iex> "Age: #{25}"
"Age: 25"
```

Attempting to interpolate a data type that doesn't implement `String.Chars` results in an error:

```elixir
iex> tuple = {1, 2, 3}
{1, 2, 3}
iex> "Tuple: #{tuple}"
** (Protocol.UndefinedError) protocol String.Chars not implemented for {1, 2, 3} of type Tuple
```

### The `Inspect` Protocol

Used by the `inspect/1` function, this protocol converts data structures into a readable string representation, handy for debugging:

```elixir
iex> inspect(tuple)
"{1, 2, 3}"
iex> "Tuple: #{inspect(tuple)}"
"Tuple: {1, 2, 3}"
```

**Note**: If the inspected value starts with `#`, it indicates that the data structure is represented in non-valid Elixir syntax, and some information may be lost.

## Conclusion

Protocols in Elixir provide a powerful way to achieve polymorphism and write generic, extensible code. By implementing protocols for different data types and structs, you can create flexible APIs that are easy to maintain and extend.

Whether you're working with built-in protocols like `Enumerable` and `Inspect` or defining your own, understanding how protocols work will make you a more effective Elixir developer.

**Happy coding!**