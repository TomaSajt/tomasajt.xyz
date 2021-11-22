const typeObjects = [Number, Boolean, String]
type AcceptedTypes = typeof typeObjects[number]
type CtorMap<T> =
    T extends NumberConstructor ? number :
    T extends BooleanConstructor ? boolean :
    T extends StringConstructor ? string :
    never;
export type TupleCtorMap<T extends TypeList> = { [P in keyof T]: CtorMap<T[P]> }
type TupleOf<T> = [T] | T[]
export type TypeList = TupleOf<AcceptedTypes>

export class Executor<T extends string = never> {
    private readonly instructionDefMap = new Map<string, InstuctionDefinition<T, any>>()
    public instructions: {name: T, args: any[]}[] = []

    AddInstructionDef<U extends string>(instrdef: InstuctionDefinition<U, any>) {
        const _this = this as Executor<T | U>
        _this.instructionDefMap.set(instrdef.name, instrdef)
        return _this;
    }
    public GetInstructionDef(name: string): InstuctionDefinition<T, any> {
        return this.instructionDefMap.get(name)
    }
}
export class InstuctionDefinition<S extends string, T extends TypeList> {
    constructor(public readonly name: S, public readonly type: T, public readonly cb: (args: TupleCtorMap<T>) => void) {
        this.name = name
        this.type = type
        this.cb = cb
    }

}