---
id: "hooks.build.rulesoverride"
title: "Interface: RulesOverride"
sidebar_label: "RulesOverride"
custom_edit_url: null
---

[Hooks](../modules/hooks.md).[Build](../modules/hooks.build.md).RulesOverride

## Hierarchy

- [`Rules`](../modules/hooks.build.md#rules)

  ↳ **`RulesOverride`**

## Properties

### length

• **length**: `number`

Gets or sets the length of the array. This is a number one higher than the highest index in the array.

#### Inherited from

Rules.length

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1224

___

### oneOf

• **oneOf**: `RuleSetRule`

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:240](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L240)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<`RuleSetRule` \| ``"..."``\>

Iterator

#### Returns

`IterableIterator`<`RuleSetRule` \| ``"..."``\>

#### Inherited from

Rules.\_\_@iterator@5837

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:60

___

### [unscopables]

▸ **[unscopables]**(): `Object`

Returns an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `copyWithin` | `boolean` |
| `entries` | `boolean` |
| `fill` | `boolean` |
| `find` | `boolean` |
| `findIndex` | `boolean` |
| `keys` | `boolean` |
| `values` | `boolean` |

#### Inherited from

Rules.\_\_@unscopables@5876

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:99

___

### concat

▸ **concat**(...`items`): (`RuleSetRule` \| ``"..."``)[]

Combines two or more arrays.
This method returns a new array without modifying any existing arrays.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | `ConcatArray`<`RuleSetRule` \| ``"..."``\>[] | Additional arrays and/or items to add to the end of the array. |

#### Returns

(`RuleSetRule` \| ``"..."``)[]

#### Inherited from

Rules.concat

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1248

▸ **concat**(...`items`): (`RuleSetRule` \| ``"..."``)[]

Combines two or more arrays.
This method returns a new array without modifying any existing arrays.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | (`RuleSetRule` \| ``"..."`` \| `ConcatArray`<`RuleSetRule` \| ``"..."``\>)[] | Additional arrays and/or items to add to the end of the array. |

#### Returns

(`RuleSetRule` \| ``"..."``)[]

#### Inherited from

Rules.concat

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1254

___

### copyWithin

▸ **copyWithin**(`target`, `start`, `end?`): [`RulesOverride`](hooks.build.rulesoverride.md)

Returns the this object after copying a section of the array identified by start and end
to the same array starting at position target

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `number` | If target is negative, it is treated as length+target where length is the length of the array. |
| `start` | `number` | If start is negative, it is treated as length+start. If end is negative, it is treated as length+end. |
| `end?` | `number` | If not specified, length of the this object is used as its default value. |

#### Returns

[`RulesOverride`](hooks.build.rulesoverride.md)

#### Inherited from

Rules.copyWithin

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:64

___

### entries

▸ **entries**(): `IterableIterator`<[`number`, `RuleSetRule` \| ``"..."``]\>

Returns an iterable of key, value pairs for every entry in the array

#### Returns

`IterableIterator`<[`number`, `RuleSetRule` \| ``"..."``]\>

#### Inherited from

Rules.entries

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:65

___

### every

▸ **every**<`S`\>(`predicate`, `thisArg?`): this is S[]

Determines whether all the members of an array satisfy the specified test.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `RuleSetRule` \| ``"..."`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `RuleSetRule` \| ``"..."``, `index`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => value is S | A function that accepts up to three arguments. The every method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

this is S[]

#### Inherited from

Rules.every

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1331

▸ **every**(`predicate`, `thisArg?`): `boolean`

Determines whether all the members of an array satisfy the specified test.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `RuleSetRule` \| ``"..."``, `index`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `unknown` | A function that accepts up to three arguments. The every method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`boolean`

#### Inherited from

Rules.every

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1340

___

### fill

▸ **fill**(`value`, `start?`, `end?`): [`RulesOverride`](hooks.build.rulesoverride.md)

Returns the this object after filling the section identified by start and end with value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `RuleSetRule` \| ``"..."`` | value to fill array section with |
| `start?` | `number` | index to start filling the array at. If start is negative, it is treated as length+start where length is the length of the array. |
| `end?` | `number` | index to stop filling the array at. If end is negative, it is treated as length+end. |

#### Returns

[`RulesOverride`](hooks.build.rulesoverride.md)

#### Inherited from

Rules.fill

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:53

___

### filter

▸ **filter**<`S`\>(`predicate`, `thisArg?`): `S`[]

Returns the elements of an array that meet the condition specified in a callback function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `RuleSetRule` \| ``"..."`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `RuleSetRule` \| ``"..."``, `index`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => value is S | A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`S`[]

#### Inherited from

Rules.filter

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1367

▸ **filter**(`predicate`, `thisArg?`): (`RuleSetRule` \| ``"..."``)[]

Returns the elements of an array that meet the condition specified in a callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `RuleSetRule` \| ``"..."``, `index`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `unknown` | A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

(`RuleSetRule` \| ``"..."``)[]

#### Inherited from

Rules.filter

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1373

___

### find

▸ **find**<`S`\>(`predicate`, `thisArg?`): `S`

Returns the value of the first element in the array where predicate is true, and undefined
otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `RuleSetRule` \| ``"..."`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `RuleSetRule` \| ``"..."``, `index`: `number`, `obj`: (`RuleSetRule` \| ``"..."``)[]) => value is S | find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined. |
| `thisArg?` | `any` | If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead. |

#### Returns

`S`

#### Inherited from

Rules.find

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:31

▸ **find**(`predicate`, `thisArg?`): `RuleSetRule` \| ``"..."``

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `RuleSetRule` \| ``"..."``, `index`: `number`, `obj`: (`RuleSetRule` \| ``"..."``)[]) => `unknown` |
| `thisArg?` | `any` |

#### Returns

`RuleSetRule` \| ``"..."``

#### Inherited from

Rules.find

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:32

___

### findIndex

▸ **findIndex**(`predicate`, `thisArg?`): `number`

Returns the index of the first element in the array where predicate is true, and -1
otherwise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `RuleSetRule` \| ``"..."``, `index`: `number`, `obj`: (`RuleSetRule` \| ``"..."``)[]) => `unknown` | find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, findIndex immediately returns that element index. Otherwise, findIndex returns -1. |
| `thisArg?` | `any` | If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead. |

#### Returns

`number`

#### Inherited from

Rules.findIndex

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:43

___

### flat

▸ **flat**<`A`, `D`\>(`depth?`): `FlatArray`<`A`, `D`\>[]

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` |
| `D` | extends `number```1`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `depth?` | `D` | The maximum recursion depth |

#### Returns

`FlatArray`<`A`, `D`\>[]

#### Inherited from

Rules.flat

#### Defined in

node_modules/typescript/lib/lib.es2019.array.d.ts:81

___

### flatMap

▸ **flatMap**<`U`, `This`\>(`callback`, `thisArg?`): `U`[]

Calls a defined callback function on each element of an array. Then, flattens the result into
a new array.
This is identical to a map followed by flat with depth 1.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | `U` |
| `This` | `undefined` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`value`: `RuleSetRule` \| ``"..."``, `index`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `U` \| readonly `U`[] | A function that accepts up to three arguments. The flatMap method calls the callback function one time for each element in the array. |
| `thisArg?` | `This` | An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`U`[]

#### Inherited from

Rules.flatMap

#### Defined in

node_modules/typescript/lib/lib.es2019.array.d.ts:70

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Performs the specified action for each element in an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `RuleSetRule` \| ``"..."``, `index`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `void` | A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`void`

#### Inherited from

Rules.forEach

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1355

___

### includes

▸ **includes**(`searchElement`, `fromIndex?`): `boolean`

Determines whether an array includes a certain element, returning true or false as appropriate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchElement` | `RuleSetRule` \| ``"..."`` | The element to search for. |
| `fromIndex?` | `number` | The position in this array at which to begin searching for searchElement. |

#### Returns

`boolean`

#### Inherited from

Rules.includes

#### Defined in

node_modules/typescript/lib/lib.es2016.array.include.d.ts:27

___

### indexOf

▸ **indexOf**(`searchElement`, `fromIndex?`): `number`

Returns the index of the first occurrence of a value in an array, or -1 if it is not present.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchElement` | `RuleSetRule` \| ``"..."`` | The value to locate in the array. |
| `fromIndex?` | `number` | The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0. |

#### Returns

`number`

#### Inherited from

Rules.indexOf

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1316

___

### join

▸ **join**(`separator?`): `string`

Adds all the elements of an array into a string, separated by the specified separator string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `separator?` | `string` | A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma. |

#### Returns

`string`

#### Inherited from

Rules.join

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1259

___

### keys

▸ **keys**(): `IterableIterator`<`number`\>

Returns an iterable of keys in the array

#### Returns

`IterableIterator`<`number`\>

#### Inherited from

Rules.keys

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:70

___

### lastIndexOf

▸ **lastIndexOf**(`searchElement`, `fromIndex?`): `number`

Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchElement` | `RuleSetRule` \| ``"..."`` | The value to locate in the array. |
| `fromIndex?` | `number` | The array index at which to begin searching backward. If fromIndex is omitted, the search starts at the last index in the array. |

#### Returns

`number`

#### Inherited from

Rules.lastIndexOf

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1322

___

### map

▸ **map**<`U`\>(`callbackfn`, `thisArg?`): `U`[]

Calls a defined callback function on each element of an array, and returns an array that contains the results.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `RuleSetRule` \| ``"..."``, `index`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `U` | A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`U`[]

#### Inherited from

Rules.map

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1361

___

### pop

▸ **pop**(): `RuleSetRule` \| ``"..."``

Removes the last element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

#### Returns

`RuleSetRule` \| ``"..."``

#### Inherited from

Rules.pop

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1237

___

### push

▸ **push**(...`items`): `number`

Appends new elements to the end of an array, and returns the new length of the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | (`RuleSetRule` \| ``"..."``)[] | New elements to add to the array. |

#### Returns

`number`

#### Inherited from

Rules.push

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1242

___

### reduce

▸ **reduce**(`callbackfn`): `RuleSetRule` \| ``"..."``

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: `RuleSetRule` \| ``"..."``, `currentValue`: `RuleSetRule` \| ``"..."``, `currentIndex`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `RuleSetRule` \| ``"..."`` | A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |

#### Returns

`RuleSetRule` \| ``"..."``

#### Inherited from

Rules.reduce

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1379

▸ **reduce**(`callbackfn`, `initialValue`): `RuleSetRule` \| ``"..."``

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`previousValue`: `RuleSetRule` \| ``"..."``, `currentValue`: `RuleSetRule` \| ``"..."``, `currentIndex`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `RuleSetRule` \| ``"..."`` |
| `initialValue` | `RuleSetRule` \| ``"..."`` |

#### Returns

`RuleSetRule` \| ``"..."``

#### Inherited from

Rules.reduce

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1380

▸ **reduce**<`U`\>(`callbackfn`, `initialValue`): `U`

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: `U`, `currentValue`: `RuleSetRule` \| ``"..."``, `currentIndex`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `U` | A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |
| `initialValue` | `U` | If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |

#### Returns

`U`

#### Inherited from

Rules.reduce

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1386

___

### reduceRight

▸ **reduceRight**(`callbackfn`): `RuleSetRule` \| ``"..."``

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: `RuleSetRule` \| ``"..."``, `currentValue`: `RuleSetRule` \| ``"..."``, `currentIndex`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `RuleSetRule` \| ``"..."`` | A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |

#### Returns

`RuleSetRule` \| ``"..."``

#### Inherited from

Rules.reduceRight

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1392

▸ **reduceRight**(`callbackfn`, `initialValue`): `RuleSetRule` \| ``"..."``

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`previousValue`: `RuleSetRule` \| ``"..."``, `currentValue`: `RuleSetRule` \| ``"..."``, `currentIndex`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `RuleSetRule` \| ``"..."`` |
| `initialValue` | `RuleSetRule` \| ``"..."`` |

#### Returns

`RuleSetRule` \| ``"..."``

#### Inherited from

Rules.reduceRight

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1393

▸ **reduceRight**<`U`\>(`callbackfn`, `initialValue`): `U`

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: `U`, `currentValue`: `RuleSetRule` \| ``"..."``, `currentIndex`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `U` | A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |
| `initialValue` | `U` | If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |

#### Returns

`U`

#### Inherited from

Rules.reduceRight

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1399

___

### reverse

▸ **reverse**(): (`RuleSetRule` \| ``"..."``)[]

Reverses the elements in an array in place.
This method mutates the array and returns a reference to the same array.

#### Returns

(`RuleSetRule` \| ``"..."``)[]

#### Inherited from

Rules.reverse

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1264

___

### shift

▸ **shift**(): `RuleSetRule` \| ``"..."``

Removes the first element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

#### Returns

`RuleSetRule` \| ``"..."``

#### Inherited from

Rules.shift

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1269

___

### slice

▸ **slice**(`start?`, `end?`): (`RuleSetRule` \| ``"..."``)[]

Returns a copy of a section of an array.
For both start and end, a negative index can be used to indicate an offset from the end of the array.
For example, -2 refers to the second to last element of the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0. |
| `end?` | `number` | The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array. |

#### Returns

(`RuleSetRule` \| ``"..."``)[]

#### Inherited from

Rules.slice

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1279

___

### some

▸ **some**(`predicate`, `thisArg?`): `boolean`

Determines whether the specified callback function returns true for any element of an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `RuleSetRule` \| ``"..."``, `index`: `number`, `array`: (`RuleSetRule` \| ``"..."``)[]) => `unknown` | A function that accepts up to three arguments. The some method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value true, or until the end of the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`boolean`

#### Inherited from

Rules.some

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1349

___

### sort

▸ **sort**(`compareFn?`): [`RulesOverride`](hooks.build.rulesoverride.md)

Sorts an array in place.
This method mutates the array and returns a reference to the same array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `compareFn?` | (`a`: `RuleSetRule` \| ``"..."``, `b`: `RuleSetRule` \| ``"..."``) => `number` | Function used to determine the order of the elements. It is expected to return a negative value if first argument is less than second argument, zero if they're equal and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order. ```ts [11,2,22,1].sort((a, b) => a - b) ``` |

#### Returns

[`RulesOverride`](hooks.build.rulesoverride.md)

#### Inherited from

Rules.sort

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1290

___

### splice

▸ **splice**(`start`, `deleteCount?`): (`RuleSetRule` \| ``"..."``)[]

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based location in the array from which to start removing elements. |
| `deleteCount?` | `number` | The number of elements to remove. |

#### Returns

(`RuleSetRule` \| ``"..."``)[]

An array containing the elements that were deleted.

#### Inherited from

Rules.splice

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1297

▸ **splice**(`start`, `deleteCount`, ...`items`): (`RuleSetRule` \| ``"..."``)[]

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based location in the array from which to start removing elements. |
| `deleteCount` | `number` | The number of elements to remove. |
| `...items` | (`RuleSetRule` \| ``"..."``)[] | Elements to insert into the array in place of the deleted elements. |

#### Returns

(`RuleSetRule` \| ``"..."``)[]

An array containing the elements that were deleted.

#### Inherited from

Rules.splice

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1305

___

### toLocaleString

▸ **toLocaleString**(): `string`

Returns a string representation of an array. The elements are converted to string using their toLocaleString methods.

#### Returns

`string`

#### Inherited from

Rules.toLocaleString

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1232

___

### toString

▸ **toString**(): `string`

Returns a string representation of an array.

#### Returns

`string`

#### Inherited from

Rules.toString

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1228

___

### unshift

▸ **unshift**(...`items`): `number`

Inserts new elements at the start of an array, and returns the new length of the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | (`RuleSetRule` \| ``"..."``)[] | Elements to insert at the start of the array. |

#### Returns

`number`

#### Inherited from

Rules.unshift

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1310

___

### values

▸ **values**(): `IterableIterator`<`RuleSetRule` \| ``"..."``\>

Returns an iterable of values in the array

#### Returns

`IterableIterator`<`RuleSetRule` \| ``"..."``\>

#### Inherited from

Rules.values

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:75
