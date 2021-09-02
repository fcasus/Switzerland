{
    
    "billing_info": {
    },
    "customer_info": {
        "address1": "Viale Stazione 11",
        "address2": "", 
        "address3": "", 
        "balance": "102.60", 
        "balance_base_currency": "102.60", 
        "business_name": "Rossi SA",
        "city": "Bellinzona",
        "country": "Switzerland", 
        "country_code": "CH", 
        "courtesy": "Signor", 
        "currency": "CHF", 
        "date_birth": "1999-10-06", 
        "email": "info@test.com", 
        "first_name": "Andrea", 
        "lang": "it",
        "last_name": "Rossi",
        "mobile": "0033608405", 
        "number": "1100",
        "origin_row": "26",
        "origin_table": "Accounts",
        "postal_code": "6500",
        "vat_number": "1234"
    },
    "document_info": {
        "currency": "CHF",
        "date": "20160101",
        "decimals_amounts": 2,
        "description": "",
        "doc_type": "10", 
        "locale": "it",
        "number": "201710",
        "origin_row": "1",
        "origin_table": "Transactions",
        "printed": "1", 
        "rounding_total": "0.05",
        "type": "invoice"
    },
    "items": [
        {
            "account_assignment": "3000",
            "description": "Prodotto A",
            "details": "",
            "index": "0",
            "item_type": "item",
            "mesure_unit": "",
            "number": "",
            "quantity": "1",
            "unit_price": {
                "amount_vat_inclusive": null,
                "amount_vat_exclusive": "540.00",
                "currency": "CHF",
                "vat_code": "V80",
                "vat_rate": "8.00"
            }
        }
    ],
    "note": [
            {
            }
    ],
    "parameters": {
    },
    "payment_info": {
        "due_date": "20160131",
        "due_days": "240",
        "payment_date": ""
    },
    "shipping_info": {
         "different_shipping_address": false,
    },
    "supplier_info": {
        "address1": "Indirizzo 1",
        "address2": "Indirizzo 2",
        "business_name": "Società",
        "city": "Loc",
        "courtesy": "Signor",
        "email": "info@myweb",
        "fax": "+419100000", 
        "first_name": "Nome",
        "fiscal_number": "222",
        "last_name": "Cognome",
        "phone": "+419100000", 
        "postal_code": "CAP",
        "state": "Suisse", 
        "vat_number": "1111", 
        "web": "http://www.myweb"
    },
    "type": "invoice",
    "version": "1.0"
}

/* dopo il calcolo effettuato con il calculateInvoice confrontare il campo total_amount_vat_inclusive con il totale nel file csv, 
fare attenzione al tipo di arrotondamento (sotto document_info-->rounding_total);

"billing_info": {
    "payment_term": "",
    "total_amount_vat_exclusive": "500.00",
    "total_amount_vat_exclusive_before_discount": "500.00",
    "total_amount_vat_inclusive": "540.00",

    ....
    */