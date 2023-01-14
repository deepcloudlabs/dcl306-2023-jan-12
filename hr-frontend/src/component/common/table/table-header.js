export default function TableHeader({columns, children}){
    return(
        <thead>
            <tr>
                {
                    columns.split(",").map( column =>
                       <th key={column}>{column}</th>
                    )
                }
            </tr>
        <tr>
            <th>
                {children}
            </th>
        </tr>
        </thead>
    );
}