import React from 'react';
import './ExamInfo.css';
import {useTranslation} from "react-i18next";

const ExamInfo = () => {
    const { t } = useTranslation();

    return(
        <section className="exam-info" data-aos="fade-up">
            <div className="container">
                <h2>{t("examInfo.title")}</h2>
                <p>{t("examInfo.description")}</p>
            </div>
        </section>
    );

};



export default ExamInfo;
