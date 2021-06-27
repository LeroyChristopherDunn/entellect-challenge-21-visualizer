import React, {ReactNode, ReactNodeArray} from "react";

export function UnderlineStatus(props: { pass?: boolean, children?: ReactNode | ReactNodeArray }) {
    return (
        <div
            className={`underline-status ${props.pass && 'underline-status-pass'} ${!props.pass && 'underline-status-fail'}`}>
            {props.children}
        </div>
    )
}