import {Card, DataTable, Grid, Text} from "@shopify/polaris";
import { useForm } from "react-hook-form"
import React, { useRef, useState, FormEvent} from "react";
import {useDispatch} from "react-redux";
import delete_icon from '../../asset/svg/delete_icon.svg'
import add_icon from '../../asset/svg/add_icon.svg'
import arrow_up from '../../asset/arrow_up.png'
import arrow_down from '../../asset/arrow_down.png'
import { defaultValueMock, DefaultValueType} from "./mock_data/home_data";
import {updateDataVolumeDiscount} from "../../api/home/homePageApi";
import {ReducerType} from "../../store/configReducer";

const Home = () => {

    const { register, handleSubmit ,  formState: { errors }} = useForm<ReducerType>()
    const dispatch = useDispatch()

    const formRef = useRef<HTMLFormElement>(null)


    const [defaultData, setDefaultData] = useState<DefaultValueType[]>(defaultValueMock)
    const switchDiscountType: Record<number, string> = {
        1: 'None',
        2: '% discount', // %
        3: 'discount / each' // $
    }


    const rows = defaultData?.map((item: DefaultValueType) => ({
            rule_title : item.rule_title,
            discount_type: switchDiscountType[item.discount_type] || '',
            quantity: item.quantity,
            amount: (item.amount && item.discount_type === 2) ? `${item?.amount?.toString() + ' %'}`  : (item.amount && item.discount_type === 3) ? `${item?.amount?.toString() + ' $'}` : ''
        })
    ) || []
    const renderRows = rows.map(item => Object.values(item))
    const handleDeleteRule = (index: number) => {
        const newData = [...defaultData.slice(0, index), ...defaultData.slice(index + 1)];
        setDefaultData(newData);
    }
    const checkNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 101 || e.charCode === 43 || e.charCode === 45) {
            e.preventDefault()
        }
    }
    const addRule = () => {
        const addNew: DefaultValueType[] = defaultData.concat({
            rule_title: '',
            subtitle: '',
            label: '',
            quantity: defaultData[defaultData.length - 1]?.quantity + 1 || 1,
            discount_type: 1,
            amount: null,
            option: defaultData[defaultData.length - 1]?.option + 1 || 1
        })
        setDefaultData(addNew)
    }

    const onSubmit: (data: any) => void = (data: any) => {
        const newPostApi = {...data, defaultValue: defaultData}
        dispatch({type: 'set', newPostApi})
        updateDataVolumeDiscount(newPostApi)
    }
    const handleFormSubmit = (data: any) => {

        if(defaultData.length > 0) {
            handleSubmit(onSubmit)(data);
        } else {
            console.error("Validation failed.");
        }
    };
    return (
        <form ref={formRef} onSubmit={handleFormSubmit}>
            <div className="submit_btn">
                <button className="details" type="submit">Save</button>
            </div>
            <Grid>
                <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 7, xl: 7}}>
                    <div className="general_card">
                        <Card>
                            <Text variant="headingXl" as="h4">
                                General
                            </Text>
                            <div className="form_input">
                                <label className="label">campaign</label>
                                <input
                                    {...register("campaign", {required: true })}
                                    className="input"
                                    placeholder="Volume discount #2"
                                />
                                {errors?.campaign?.type === "required" && <p className="err_msg">Please enter this field</p>}
                            </div>
                            <div className="form_input">
                                <label className="label">title</label>
                                <input {...register("title", {required: true})} className="input" placeholder="Buy more and save"/>
                                {errors?.title?.type === "required" && <p className="err_msg">Please enter this field</p>}
                            </div>
                            <div className="form_input">
                                <label className="label">description</label>
                                <input {...register("description", {required: false})} className="input" placeholder="Apply for all products in store"/>
                            </div>
                        </Card>
                    </div>
                    <Card padding="0">
                        <div className="rule_text">
                            <Text variant="headingXl" as="h4">
                                Volume discount rule
                            </Text>
                        </div>
                        {defaultData.map((item: DefaultValueType, index: number) => (
                            <div className="rule_form" key={index}  >
                                <div className="option">Option {item?.option || ''}</div>
                                <div className="delete_icon">
                                    <img src={delete_icon} alt="delete" className='details_icon'
                                         onClick={() => handleDeleteRule(index)}/>
                                </div>
                                <div className="rule_form_input_group">
                                    <div className="rule_form_input">
                                        <label className="rule_label">Title</label>
                                        <input
                                            className="rule_input"
                                            defaultValue={item.rule_title}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const newValue = event.target.value;
                                                const updatedData = defaultData.map((dataItem, dataIndex) => {
                                                    if (index === dataIndex) {
                                                        return {
                                                            ...dataItem,
                                                            rule_title: newValue
                                                        };
                                                    }
                                                    return dataItem;
                                                });
                                                setDefaultData(updatedData);
                                            }}
                                        />
                                        {item.rule_title === '' ?
                                            <p className="err_msg">Please enter this field</p> : <></>}
                                    </div>
                                    <div className="rule_form_input">
                                        <label className="rule_label">Subtitle</label>
                                        <input
                                            className="rule_input"
                                            defaultValue={item?.subtitle || ''}
                                        />
                                    </div>
                                    <div className="rule_form_input">
                                        <label className="rule_label">Label (optional)</label>
                                        <input
                                               className="rule_input"
                                               defaultValue={item?.label || ''}
                                        />
                                    </div>
                                    <div className="rule_form_input">
                                        <label className="rule_label">Quantity</label>
                                        <input
                                            type="number"
                                            className="rule_input"
                                            defaultValue={item?.quantity || 0}
                                            onKeyPress={(e: any) => checkNumber(e)}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const newValue = event.target.value || 0;
                                                const updatedData = defaultData.map((dataItem, dataIndex) => {
                                                    if (index === dataIndex) {
                                                        return {
                                                            ...dataItem,
                                                            quantity: Number(newValue)
                                                        };
                                                    }
                                                    return dataItem;
                                                });
                                                setDefaultData(updatedData);
                                            }}
                                        />
                                        {item.quantity === 0 ?
                                            <p className="err_msg">Please enter this field</p> : <></>}
                                    </div>
                                    <div className="rule_form_input">
                                        <label className="rule_label">Discount type</label>
                                        <input
                                               className="rule_input_none"
                                               defaultValue={item.discount_type}
                                        />
                                        <div className="rule_input_custom">
                                            <div className="custom_none_input">
                                                <div>{switchDiscountType[item.discount_type] || ''}</div>
                                                <div className="arrow_up" onClick={() => {
                                                    let newValue: number;
                                                    if(item.discount_type >= 3) {
                                                        newValue = 1
                                                    } else {
                                                        newValue = item.discount_type + 1
                                                    }
                                                    const updatedData = defaultData.map((dataItem, dataIndex) => {
                                                        if (index === dataIndex) {
                                                            return {
                                                                ...dataItem,
                                                                discount_type: Number(newValue)
                                                            };
                                                        }
                                                        return dataItem;
                                                    });
                                                    setDefaultData(updatedData);
                                                }}>
                                                    <img src={arrow_up} alt="arrow_up" className="arrow_up_img"/>
                                                </div>
                                                <div className="arrow_down" onClick={() => {
                                                    let newValue: number;
                                                    if(item.discount_type <= 1) {
                                                        newValue = 3
                                                    } else {
                                                        newValue = item.discount_type - 1
                                                    }
                                                    const updatedData = defaultData.map((dataItem, dataIndex) => {
                                                        if (index === dataIndex) {
                                                            return {
                                                                ...dataItem,
                                                                discount_type: Number(newValue)
                                                            };
                                                        }
                                                        return dataItem;
                                                    });
                                                    console.log(newValue)
                                                    setDefaultData(updatedData);
                                                }}>
                                                    <img src={arrow_down} alt="arrow_down" className="arrow_down_img"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={item.discount_type === 1 ? 'none_input' : 'rule_form_input_amount'}>
                                        <label className="rule_label">Amount</label>
                                        <input
                                            type="number"
                                            className="rule_input"
                                            defaultValue={item?.amount || 0}
                                            onKeyPress={(e: any) => checkNumber(e)}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const newValue = event.target.value;
                                                const updatedData: DefaultValueType[] = defaultData.map((dataItem, dataIndex) => {
                                                    if (index === dataIndex) {
                                                        return {
                                                            ...dataItem,
                                                            amount: Number(newValue) || null
                                                        };
                                                    }
                                                    return dataItem;
                                                });
                                                setDefaultData(updatedData);
                                            }}
                                        />
                                        <div className="rule_input_amount_sub">{item.discount_type === 2 ? '%' : item.discount_type === 3 ?  '$' : ''}</div>
                                        {item.amount === null ?
                                            <p className="err_msg">Please enter this field</p> : <></>}
                                    </div>
                                </div>
                            </div>

                        ))}
                        <div className="add_rule">
                            <div className="add_rule_detail" onClick={addRule}>
                                <img src={add_icon} alt="add" className="add_icon"/>
                                <Text variant="headingLg" as="h5">
                                    Add option
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Grid.Cell>
                <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 5, xl: 5}}>
                    <Card>
                        <Text variant="headingXl" as="h4">
                            Preview
                        </Text>
                        <br/>
                        <Text variant="headingXl" as="h4" alignment="center">
                            Buy more and save
                        </Text>
                        <br/>
                        <Text variant="headingLg" as="h5">
                            Apply for all products in store
                        </Text>
                        <br/>
                        <DataTable
                            columnContentTypes={[
                                'text',
                                'text',
                                'numeric',
                                'text',
                            ]}
                            headings={[
                                'Title',
                                'Discount Type',
                                'Quantity',
                                'Amount',
                            ]}
                            rows={renderRows}
                        />
                    </Card>
                </Grid.Cell>
            </Grid>
        </form>
    )
}
export default Home;