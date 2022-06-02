/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentMainCBB from "../../../components/CyberBugs/ProjectDetailCBB/ContentProjectDetailCBB";
import HeaderMainCBB from "../../../components/CyberBugs/ProjectDetailCBB/HeaderProjectDetailCBB";
import InfoMainCBB from "../../../components/CyberBugs/ProjectDetailCBB/InfoProjectDetailCBB";
import { getProjectDetailAPIAction } from "../../../redux/actions/CyberBugs/ProjectActions";

export default function ProjectDetailCBB(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const { projectID } = props.match.params;
    dispatch(getProjectDetailAPIAction(projectID));
  }, []);

  let { projectDetail } = useSelector((state) => state.ProjectReducers);

  return (
    <>
      <HeaderMainCBB project={projectDetail} />
      <InfoMainCBB project={projectDetail} />
      <ContentMainCBB project={projectDetail} />
    </>
  );
}
