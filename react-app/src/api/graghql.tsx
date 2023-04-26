import { gql } from '@apollo/client';

export const Q1 = gql`
	    query AllAccountsQuery {
	  		accounts {
            	address
            	balance
          	}
          	contracts {
            	address
            	balance
          	}
		}
`


 
