import Badge from "../common/output/badge";

export default function JobStyle({id, fulltime}) {
    let badge = <Badge bgColor="bg-info"
                       id={id}
                       value="PART-TIME"/>;
    if (fulltime)
        badge = <Badge bgColor="bg-primary"
                       id={id}
                       value="FULL-TIME"/>
    return (
        <>
            {badge}
        </>
    );
}