export default function Autobind(
    _: unknown,
    _2: string,
    descriptor: PropertyDescriptor,
): PropertyDescriptor {
    const originalMethod = descriptor.value;
    return {
        configurable: true,
        enumerable: false,
        get(): PropertyDescriptor {
            return originalMethod.bind(this);
        },
    };
}
