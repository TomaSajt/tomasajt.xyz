const typeObjects = [Number, BigInt, Boolean, String]
type AcceptedTypes = typeof typeObjects[number]
type CtorMap<T> =
    T extends NumberConstructor ? number :
    T extends BigIntConstructor ? bigint :
    T extends BooleanConstructor ? boolean :
    T extends StringConstructor ? string :
    never;
type TupleCtorMap<T extends [AcceptedTypes] | AcceptedTypes[]> = { [P in keyof T]: CtorMap<T[P]> }

export class InstuctionExecutor {
    constructor(private readonly _instructionDefinitions: InstuctionDefinition<any>) {
        
    }
}   
export class InstuctionDefinition<T extends [AcceptedTypes] | AcceptedTypes[]> {
    constructor(public readonly name: string, public readonly type: T, public readonly cb: (args: TupleCtorMap<T>) => void) {
        this.name = name
        this.type = type
        this.cb = cb
    }

}
new InstuctionDefinition("something", [Number, Number, Boolean, String, Boolean], ([num1,num2,bool1,str1,bool2]) => {
    console.log(num1, num2, bool1, str1, bool2)
});