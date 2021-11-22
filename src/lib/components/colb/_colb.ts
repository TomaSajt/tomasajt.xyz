const typeObjects = [Number, BigInt, Boolean, String]
type AcceptedTypes = typeof typeObjects[number]
type CtorMap<T> =
    T extends NumberConstructor ? number :
    T extends BigIntConstructor ? bigint :
    T extends BooleanConstructor ? boolean :
    T extends StringConstructor ? string :
    never;
type TupleCtorMap<T extends TypeList> = { [P in keyof T]: CtorMap<T[P]> }
type TypeList = [AcceptedTypes] | AcceptedTypes[]

export class InstuctionExecutor<T extends string = never> {
    private readonly _instructionDefMap = new Map<T, { types: TypeList, cb: (args: TupleCtorMap<any>) => void }>()

    AddInstructionDef<U extends string>(instrdef: InstuctionDefinition<U, any>) {
        return this as InstuctionExecutor<T | U>
    }
}
export class InstuctionDefinition<S extends string, T extends TypeList> {
    constructor(public readonly name: S, public readonly type: T, public readonly cb: (args: TupleCtorMap<T>) => void) {
        this.name = name
        this.type = type
        this.cb = cb
    }

}
const addInstrDef = new InstuctionDefinition("add", [Number, Number], ([a, b]) => console.log(a + b));
const executor = new InstuctionExecutor().AddInstructionDef(addInstrDef)
executor.instructionDefs