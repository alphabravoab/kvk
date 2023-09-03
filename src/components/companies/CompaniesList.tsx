import React from "react";
import type { Company } from "../../types/company";
import CompanyLine from "./CompanyLine"
import "./companiesList.css"

type RenderProps = {
    companyList: Array<Company>
}

function CompaniesList({companyList}: RenderProps) {
    if (Boolean(companyList.length === 0)) {
        return(
            <section>
                <div className="no-results">No results found</div>
            </section>
        )
    }
    return (
        <section>
            {companyList.map(comp => <CompanyLine key={comp.id} company={comp} />)}
        </section>
    )
}

export default CompaniesList;