import React, { useState, useEffect } from "react";
import type { Company } from "../../types/company";
import type { CompanyDetails } from "../../types/companyDetails";
import type { Response } from "../../types/response";
import { http_get } from "../../util/httpClients";
import "./companyLine.css"


type RenderProps = {
    company: Company
}
function CompanyLine({company}: RenderProps) {
    const [show, changeShow] = useState(false);
    const [companyDetails, changeCompanyDetails] = useState<CompanyDetails | null>() 
    useEffect(() => {
        if (show) {
            console.log('testing show')
            http_get<Response<CompanyDetails[]>>(`/${company.id}/details`).then(x => {
                changeCompanyDetails(x.data.data[0])
            });
        }
    }, [show, company.id])
        return (
            <article>
                <div className="main-info-container">
                    <div className="company-logo-container"><img src={company.logo} alt={company.name} /></div>
                    <div className="company-name">{company.name}</div>
                    <div className="company-location">
                        <div>{company.streetName}</div>
                        <div>{company.city}</div>
                    </div>
                    <button className="details-button" onClick={() => changeShow(!show)}>{show ? <>Hide details</>: <>Show details</>}</button>
                </div>
                {show && companyDetails && (
                <div className="details-container">
                    <div className="catch-phrase">Catch phrase: {companyDetails.catchPhrase}</div>
                    <div>Phone: {companyDetails.phoneNumber}</div>
                    <div>Website: {companyDetails.website}</div>
                </div>
                    )}
            </article>
        )
}

export default CompanyLine;