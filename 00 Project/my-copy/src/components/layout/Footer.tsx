import classes from "./Footer.module.scss";

export default function Footer(props: React.HTMLAttributes<HTMLElement>) {
    return (
        <footer className={classes.footer} {...props}>
            <p>Footer</p>
        </footer>
    );
}
