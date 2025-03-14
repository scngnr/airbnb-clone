import useCountries from "@/hooks/useCountries";
import { t } from "i18next";
import Select from "react-select";



export type CountrySelectValue = {
    label:string,
    value:string,
    flag:string,
    latlng:number[],
    region:string,
}

interface CountrySelectProps{
    value?:CountrySelectValue,
    onChange:(value:CountrySelectValue)=>void,
}

const CountrySelect = ({value, onChange}:CountrySelectProps) => {

    const { getAll } = useCountries();

    return ( 
        <div>
            <Select 
                placeholder={t("Anywhere")}
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option:any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div> {option.flag}</div>
                        <div> 
                            {option.label},
                            <span className="text-neutral-800 ml-1">({option.region})</span>
                        </div>
                    </div>
                )}
                className={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => '#ffe4e6',
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                   colors:{
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#ffe4e6',
                   }
                })}
            />
        </div>
     );
}
 
export default CountrySelect;