export type DefaultValueType = {
    rule_title: string
    subtitle: string
    label: string
    quantity: number
    discount_type: number
    amount: number | null
    option: number
}
export const defaultValueMock: DefaultValueType[] = [
    {
        rule_title: 'Single',
        subtitle: 'Standard',
        label: '',
        quantity: 1,
        discount_type: 1,
        amount: null,
        option: 1
    },
    {
        rule_title: 'Duo',
        subtitle: 'Save 10%',
        label: 'Popular',
        quantity: 2,
        discount_type: 2,
        amount: 10,
        option: 2
    }
]