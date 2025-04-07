
export type TextInputType={
    label:string
    placeholder:string
    name:string
    value?:string
    type?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    required?: boolean
    customLabelStyle?: React.CSSProperties
}
