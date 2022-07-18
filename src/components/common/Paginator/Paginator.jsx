import classes from "../Paginator/Paginator.module.css"

let Paginator = ({ currentPage, onPageChanged, totalUsersCount, pageSize, ...props }) => {
    let pageCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map(p => {
            return <span className={currentPage === p ? classes.selectedPage : null}
                onClick={() => { onPageChanged(p) }}>{p}</span>
        })}
    </div>
}

export default Paginator