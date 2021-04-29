import React, {useState} from "react";
import {IonIcon, IonItemDivider, IonPage, useIonModal} from "@ionic/react";
import {helpCircleOutline} from "ionicons/icons";
import {ReactComponentOrElement} from "@ionic/react/dist/types/hooks/useOverlay";

interface Props {
    content: ReactComponentOrElement,
    label: string,
    cssClass: string,
}

const CustomDivider: React.FC<Props> = ({content, label, cssClass}) => {
    const handleDismiss = () => {
        dismiss();
    };

    /**
     * First parameter is the component to show, second is the props to pass
     */
    const [present, dismiss] = useIonModal(content, {
        onDismiss: handleDismiss,
    });

    return (
        <IonItemDivider color="tertiary">
            {label}
            <IonIcon className="divider" slot="end" icon={helpCircleOutline}
                     onClick={() => {
                         present({
                             cssClass: cssClass,
                             backdropDismiss: true
                         });
                     }}/>
        </IonItemDivider>
    );
};

export default CustomDivider;