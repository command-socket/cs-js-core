#### `Command`

An interface representing the basic form of an executable command. 

```typescript
interface Command<C extends CommandStructure, N extends string = string> { ... }
```

---

#### `#getName`

Returns the name of the Command. 

**Parameters**:
 - _None_

**Returns** the name of the Command.

```typescript
getName(): N;
```

---

#### `#execute`

Executes the Command with the provided parameters and within the provided context, returning the resulting value. 

**Parameters**:
 - **params** The parameters with which to execute this Command.
 - **context** The CommandSocket context with which to execute this Command.

**Returns** The return value of the executed Command.

```typescript
execute(parameter: C["parameter"], context: CommandSocket): Promise<C["return"]>;
```
