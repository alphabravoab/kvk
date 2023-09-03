import React, {useEffect, useState} from "react"; 
import { useForm, SubmitHandler } from "react-hook-form";
import queryString from "query-string";
import type { Company } from "../../types/company"
import { http_get } from "../../util/httpClients";
import CompaniesList from "../companies/CompaniesList";
import search from "../svg/searchIcon.svg";
import "./search.css"

type FormValue = {
    name: string,
    city: string,
}

type Response<T> = {
    data: T;
}

function Search() {
    const [companyList, changeCompanyList] = useState<Array<Company>>([])
    const { register, handleSubmit } = useForm<FormValue>();
    useEffect(() => {
        http_get<Response<Company[]>>("").then(x => {
            changeCompanyList(x.data.data)
        });
    }, [])
    const onSubmit: SubmitHandler<FormValue> = (values) => {
        const params = {
            search: values.name,
            city: values.city
        }
        const queryParam = queryString.stringify(params)

        http_get<Response<Company[]>>(`?${queryParam}`).then(x => {
            changeCompanyList(x.data.data)
        });
    }
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
            <input className="nameInput" {...register("name")} placeholder="Company name" />
            <div className="divider" />
            <input {...register("city")} placeholder="Company city" />
            <button type="submit"><img src={search} alt="search" className="searchIcon" /></button>
        </form>

        <CompaniesList companyList={companyList} />
        </>
    )
}

export default Search;