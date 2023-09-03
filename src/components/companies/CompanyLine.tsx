import React from "react";
import type { Company } from "../../types/company";
import "./companyLine.css"

type RenderProps = {
    company: Company
}
function CompanyLine({company}: RenderProps) {
        return (
            <article>
                <div className="company-logo-container"><img src={company.logo} alt={company.name} /></div>
                <div className="company-name">{company.name}</div>
                <div className="company-location">
                    <div>{company.streetName}</div>
                    <div>{company.city}</div>
                </div>
            </article>
        )
}

export default CompanyLine;