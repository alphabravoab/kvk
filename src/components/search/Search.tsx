import React, {useEffect, useState} from "react"; 
import { useForm, SubmitHandler } from "react-hook-form";
import queryString from "query-string";
import type { Company } from "../../types/company"
import type { Response } from "../../types/response"
import { http_get } from "../../util/httpClients";
import CompaniesList from "../companies/CompaniesList";
import Modal from "../modal/Modal";
import search from "../svg/searchIcon.svg";
import Pagination from "./Pagination"
import "./search.css"

type FormValue = {
    name: string,
    city: string,
}

type Params = {
    page: number,
    limit: number
    search?: string,
    city?: string,
}

function Search() {
    const [companyList, changeCompanyList] = useState<Array<Company>>([]);
    const [page, setPage] = useState(1);
    const [totalCompanies, changeTotalCompanies] = useState(0);
    const [error, setError] = useState<string>("");
    const { register, handleSubmit, getValues } = useForm<FormValue>();
    const limit = 5;
    useEffect(() => {
        http_get<Response<Company[]>>(`?page=${page}&limit=${limit}`).then(x => {
            changeCompanyList(x.data.data);
            changeTotalCompanies(x.data.total);
        });
    }, []);
    useEffect(() => {
        const params = getValues;
        http_get<Response<Company[]>>(`?page=${page}&limit=${limit}&${params}`).then(x => {
            changeCompanyList(x.data.data);
        
        });
    }, [page])
    const onSubmit: SubmitHandler<FormValue> = (values) => {
        const params: Params = {
            search: values.name,
            page, limit, 
        }
        if (values.city) {
            params.city = values.city;
        }
        const queryParam = queryString.stringify(params)

        http_get<Response<Company[]>>(`?${queryParam}`).then(x => {
            changeCompanyList(x.data.data);
            changeTotalCompanies(x.data.total);
        }).catch(e => {
            setError(e.request.responseText); 
        });
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <input className="name-input" {...register("name")} placeholder="Company name" aria-label="Name of the company" />
                <div className="divider" />
                <input {...register("city")} placeholder="Company city" />
                <button type="submit" className="search-button">
                    <div className="mobile-only search">Search</div><img src={search} alt="search" className="search-icon" aria-label="City of the company" />
                </button>
            </form>
            <Modal open={error !== ""} requestClose={() => setError("")}><div>{error}</div></Modal>
            <CompaniesList companyList={companyList} />
            <Pagination currentPage={page} setPage={setPage} totalPages={totalCompanies / limit} />
        </>
    )
}

export default Search;