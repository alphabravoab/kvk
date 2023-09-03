import React, {useEffect, useState} from "react"; 
import { useForm, SubmitHandler } from "react-hook-form";
import queryString from "query-string";
import type { Company } from "../../types/company"
import type { Response } from "../../types/response"
import { http_get } from "../../util/httpClients";
import CompaniesList from "../companies/CompaniesList";
import Modal from "../modal/Modal";
import search from "../svg/searchIcon.svg";
import "./search.css"

type FormValue = {
    name: string,
    city: string,
}

type Params = {
    search?: string,
    city?: string,
}

function Search() {
    const [companyList, changeCompanyList] = useState<Array<Company>>([]);
    const [error, setError] = useState<string>("")
    const { register, handleSubmit } = useForm<FormValue>();
    useEffect(() => {
        http_get<Response<Company[]>>("").then(x => {
            changeCompanyList(x.data.data)
        });
    }, [])
    const onSubmit: SubmitHandler<FormValue> = (values) => {
        const params: Params = {}
        if (values.name) {
            params.search = values.name;
        }
        if (values.city) {
            params.city = values.city;
        }
        const queryParam = queryString.stringify(params)

        http_get<Response<Company[]>>(`?${queryParam}`).then(x => {
            changeCompanyList(x.data.data)
        }).catch(e => {
            setError(e.request.responseText);
                console.log("t", e.request)
            
        });
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <input className="name-input" {...register("name")} placeholder="Company name" />
                <div className="divider" />
                <input {...register("city")} placeholder="Company city" />
                <button type="submit"><div className="mobile-only search">Search</div><img src={search} alt="search" className="search-icon" /></button>
            </form>
            <Modal open={error !== ""} requestClose={() => setError("")}><div>{error}</div></Modal>
            <CompaniesList companyList={companyList} />
        </>
    )
}

export default Search;