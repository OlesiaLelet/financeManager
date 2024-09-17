import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dayjs} from 'dayjs';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import {SvgIconTypeMap} from '@mui/material'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PaidIcon from '@mui/icons-material/Paid';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MoneyIcon from '@mui/icons-material/Money';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import MuseumIcon from '@mui/icons-material/Museum';
import HomeIcon from '@mui/icons-material/Home';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SchoolIcon from '@mui/icons-material/School';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ArticleIcon from '@mui/icons-material/Article';
import SendIcon from '@mui/icons-material/Send';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';



export interface SpendingsOrIncome {
    type: string,
    sum: number,
    category: string,
    notes: string,
    date: Dayjs | null,
    account: string,
    id: number,
    iconOfCat: 
    OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }
    iconOfAcc: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }

};
type SvgInHtml = HTMLElement & SVGElement;

interface Category {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    name: string,
    id: number,
};

interface InitialState {
    transactions: SpendingsOrIncome[],
    categoryOfSpendings: Category[],
    categoryOfIncome: Category[],
    categoryOfAccount: Category[],
};


const initialState: InitialState = {
    categoryOfSpendings: [{
        name: "Food",
        id: 1,
        icon: FastfoodIcon
    }, {
        name: "SelfImpovement",
        id: 2,
        icon: SelfImprovementIcon
    }, {
        name:"Transport" ,
        id: 3,
        icon: DirectionsTransitIcon
    }, {
        name:"Culture" ,
        id: 4,
        icon:MuseumIcon
    } ,{ name: "Household",
        id: 5,
        icon: HomeIcon
    }, {
        name: "Clothes",
        id: 6,
        icon:CheckroomIcon
    }, {
        name: "Beauty",
        id: 7,
        icon: FaceRetouchingNaturalIcon
    }, {
        name: "Health",
        id: 8,
        icon: HealthAndSafetyIcon
    }, {
        name: "Education",
        id: 9,
        icon: SchoolIcon
    }, {
        name: "Presents",
        id: 10,
        icon: CardGiftcardIcon
    }, {
        name: "Another",
        id: 11,
        icon: ArticleIcon
    } , {
        name: "Сharity",
        id: 12,
        icon: SendIcon
     },{
        name: "Sport",
        id: 13,
        icon: SportsMartialArtsIcon
     } 
    ],
    categoryOfIncome:[{
        name:"Assistance",
        id:1,
        icon: HelpCenterIcon,
    },{
        name:"Salary",
        id:2,
        icon: BusinessCenterIcon
    }, {
        name: "Bonuses",
        id:3,
        icon: PriceChangeIcon
    } , {
        name:"Pocket money",
        id:4,
        icon: MonetizationOnIcon

    }, {
        name:"Another",
        id:5,
        icon: PaidIcon
    }
   ],
    categoryOfAccount: [{
        name:"Cash" ,
        id: 1,
        icon: MoneyIcon,
     } ,{
        name: "Bank account",
        id: 2,
        icon: AccountBalanceWalletIcon,
     } ,{
        name: "Credit card" ,
        id: 3,
        icon: CreditCardIcon
     }],
    transactions :[

    ]
     


}

export const financeManagerSlice = createSlice({
    name: 'financeManager',
    initialState,
     reducers: {
        saveUpdate (state, actions: PayloadAction<SpendingsOrIncome>) {
             state.transactions?.push(actions.payload)
        
        },
        editTransaction (state, actions: PayloadAction<SpendingsOrIncome>) {
         const updatedItem =   state.transactions?.find(item => item.id===actions.payload.id);
         if(updatedItem) {
             updatedItem.sum = actions.payload.sum;
             updatedItem.account = actions.payload.account;
             updatedItem.category = actions.payload.category;
             updatedItem.date = actions.payload.date;
             updatedItem.notes = actions.payload.notes;
         }
        

        },
        deleteTransaction (state, actions: PayloadAction <number>) {
            const filteredTransactions = state.transactions.filter((item) => item.id!==actions.payload);
            state.transactions = filteredTransactions;

         }
     }
     
     })
  
  export const {saveUpdate, editTransaction, deleteTransaction} = financeManagerSlice.actions
  
  export default financeManagerSlice.reducer;