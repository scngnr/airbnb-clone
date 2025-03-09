import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../../Container"
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'Pictures of the beach with the best views'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'Pictures of the windmills with the best views',
    },
    {
        label:'Modern',
        icon: MdOutlineVilla,
        description: 'Pictures of the modern houses with the best views',
    },
    {
        label:'CountrySide',
        icon: TbMountain,
        description: 'This property is located in the countryside',
    },
    {
        label:'Pools',
        icon: TbPool,
        description: 'This property has a pool',
    },
    {
        label:'Island',
        icon: GiIsland,
        description: 'This property is located in the island',
    },
    {
        label:'Lake',
        icon: GiBoatFishing,
        description: 'This property is located in the island',
    },
    {
        label:'Skiing',
        icon: FaSkiing,
        description: 'This property is located in the island',
    },
    {
        label:'Castles',
        icon: GiCastle,
        description: 'This property is located in the island',
    },
    {
        label:'Camping',
        icon: GiForestCamp,
        description: 'This property is located in the island',
    },
    {
        label:'Arctic',
        icon: BsSnow,
        description: 'This property is located in the island',
    },
    {
        label:'Cave',
        icon: GiCaveEntrance,
        description: 'This property is located in the island',
    },
    {
        label:'Desert',
        icon: GiCactus,
        description: 'This property is located in the island',
    },
    {
        label:'Barns',
        icon: GiBarn,
        description: 'This property is located in the island',
    },
    {
        label:'Lux',
        icon: IoDiamond,
        description: 'This property is located in the island',
    }
]

const Categories = () => {

    const params = useSearchParams();
    const category = params?.get('category') || '';
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if(!isMainPage) return null;




    return ( 
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto scrollbar-thin ">
                {categories.map((item) => 
                    <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected={category === item.label}
                    icon={item.icon}
                />
                )}
            </div>
        </Container>
     );
}
 
export default Categories;