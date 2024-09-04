import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import React from "react";

export default function AdminViewReferralLetter({ referenceLetterViewUser }) {
  const referenceLetter = referenceLetterViewUser || {};
  const { t } = useTranslation();
  const {
    namePastorLeader = "N/A",
    surnamePastorLeader = "N/A",
    numberPastorLeader = "N/A",
    timeInChurch = "N/A",
    dateBaptism = "N/A",
    nameGuardian = "N/A",
    numberGuardian = "N/A",
    numberChurch = "N/A",
    referenceDetails = "N/A",
    acceptDecline = false,
    createdAt = "N/A",
  } = referenceLetter;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500 text-sm ">
            {t(
              "src.pages.dashboard.queueUsers.adminReferenceLetterLabelPastorName"
            )}
            :
          </span>
          <span className="text-sm">
            {namePastorLeader} {surnamePastorLeader}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500 text-sm">
            {t(
              "src.pages.dashboard.queueUsers.adminReferenceLetterLabelPastorNumber"
            )}
            :
          </span>
          <span className="text-sm">{numberPastorLeader}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500 text-sm">
            {t(
              "src.pages.dashboard.queueUsers.adminReferenceLetterLabelTimeInChurch"
            )}
            :
          </span>
          <span className="text-sm">
            {timeInChurch !== "N/A" ? formatDate(timeInChurch) : "N/A"}
          </span>
        </div>

        {dateBaptism && (
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500 text-sm">
              {t(
                "src.pages.dashboard.queueUsers.adminReferenceLetterLabelDateOfBaptism"
              )}
              :
            </span>
            <span className="text-sm">
              {dateBaptism !== "N/A" ? formatDate(dateBaptism) : "N/A"}
            </span>
          </div>
        )}
        {nameGuardian && (
          <>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500 text-sm">
                {t(
                  "src.pages.dashboard.queueUsers.adminReferenceLetterLabelGuardianName"
                )}
                :
              </span>
              <span className="text-sm">{nameGuardian}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500 text-sm">
                {t(
                  "src.pages.dashboard.queueUsers.adminReferenceLetterLabelCustodianChurchNumber"
                )}
                :
              </span>
              <span className="text-sm">{numberGuardian}</span>
            </div>
          </>
        )}
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500 text-sm">
            {t(
              "src.pages.dashboard.queueUsers.adminReferenceLetterLabelChurchNumber"
            )}
            :
          </span>
          <span className="text-sm">{numberChurch ? numberChurch : "N/A"}</span>
        </div>
        {referenceDetails && (
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500 text-sm">
              {t(
                "src.pages.dashboard.queueUsers.adminReferenceLetterLabelReferenceDetail"
              )}
              :
            </span>
            <span className="text-sm">{referenceDetails}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500 text-sm">
            {t(
              "src.pages.dashboard.queueUsers.adminReferenceLetterLabelAcceptedDecline"
            )}
            :
          </span>
          <span className="text-sm">
            {acceptDecline ? "Accepted" : "Declined"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500 text-sm">
            {t(
              "src.pages.dashboard.queueUsers.adminReferenceLetterLabelCreatedAt"
            )}
            :
          </span>
          <span className="text-sm">
            {createdAt !== "N/A" ? formatDate(createdAt) : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

AdminViewReferralLetter.propTypes = {
  referenceLetterViewUser: PropTypes.object,
};
