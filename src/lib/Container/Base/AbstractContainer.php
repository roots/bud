<?php

namespace Roots\Bud\Container\Base;

use ArrayAccess;
use Roots\Bud\Container\Contracts\ContainerInterface;

/**
 * Abstract Container.
 *
 * Adapted from Fabien Potencier's Pimple v1
 *
 * @package Roots\Bud
 * @author  Kelly Mears
 */
abstract class AbstractContainer implements
    ArrayAccess,
    ContainerInterface
{
    /** @var array */
    protected $values = [];

    /**
     * Instantiate the container.
     *
     * @param array $values
     */
    public function __construct(array $values = [])
    {
        $this->values = $values;
    }

    /**
     * Sets a parameter or an object.
     *
     * @param  string $id
     * @param  mixed  $value
     * @return void
     */
    public function offsetSet($id, $value): void
    {
        $this->values[$id] = $value;
    }

    /**
     * Gets a parameter or an object.
     *
     * @param  string $id
     * @return mixed
     */
    public function offsetGet($id)
    {
        if (!array_key_exists($id, $this->values)) {
            throw new InvalidArgumentException(
                sprintf('Identifier "%s" is not defined.', $id)
            );
        }

        $isFactory = is_object($this->values[$id])
            && method_exists($this->values[$id], '__invoke');

        return $isFactory
            ? $this->values[$id]($this) : $this->values[$id];
    }

    /**
     * Checks if a parameter or an object is set.
     *
     * @param  string $id The unique identifier for the parameter or object
     * @return Boolean
     */
    public function offsetExists($id): bool
    {
        return array_key_exists($id, $this->values);
    }

    /**
     * Unsets a parameter or an object.
     *
     * @param string $id
     */
    public function offsetUnset($id): void
    {
        unset($this->values[$id]);
    }

    /**
     * Returns a closure that stores the result of the given service definition
     * for uniqueness.
     *
     * @param  callable $callable
     * @return Closure The wrapped closure
     */
    public static function share($callable)
    {
        if (! is_object($callable) || ! method_exists($callable, '__invoke')) {
            throw new InvalidArgumentException(
                'Service definition is not a Closure or invokable object.'
            );
        }

        return function ($c) use ($callable) {
            static $object;

            if (null === $object) {
                $object = $callable($c);
            }

            return $object;
        };
    }

    /**
     * Protects a callable from being interpreted as a service.
     *
     * @param callable $callable A callable to protect from being evaluated
     *
     * @return Closure The protected closure
     */
    public static function protect($callable): callable
    {
        if (! is_object($callable) || ! method_exists($callable, '__invoke')) {
            throw new InvalidArgumentException(
                'Callable is not a Closure or invokable object.'
            );
        }

        return function () use ($callable) {
            return $callable;
        };
    }

    /**
     * Returns all defined value names.
     *
     * @return array An array of value names
     */
    public function services(): array
    {
        return array_keys($this->values);
    }
}