<?php

namespace Roots\Bud\Collection;

use Countable;
use ArrayAccess;
use JsonSerializable;
use IteratorAggregate;
use Roots\Bud\Collection\Contracts\Jsonable;
use Roots\Bud\Collection\Base\AbstractCollection;

/**
 * Collection.
 *
 * @package Roots\Bud
 * @author  Kelly Mears <kelly@roots.io>
 */
class Collection extends AbstractCollection implements
    ArrayAccess,
    Countable,
    IteratorAggregate,
    JsonSerializable,
    Jsonable
{
    // --
}
