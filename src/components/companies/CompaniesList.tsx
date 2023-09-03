import React from "react";
import type { Company } from "../../types/company";
import CompanyLine from "./CompanyLine"
import "./companiesList.css"

type RenderProps = {
    companyList: Array<Company>
}

function CompaniesList({companyList}: RenderProps) {
    return (
        <section>
            {companyList.map(comp => <CompanyLine company={comp} />)}
        </section>
    )
}

export default CompaniesList;