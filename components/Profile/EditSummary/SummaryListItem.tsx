import React from 'react';

interface SummaryListItemProp {
  company_name?: string;
  school_name?: string;
  major?: string;
  job_title?: string;
  Icon: any;
}
const SummaryListItem = (props: SummaryListItemProp) => {
  const { company_name, school_name, major, job_title, Icon } = props;
  return (
    <div className="my-2 flex items-center space-x-2">
      <Icon className="h-6" />
      <span>在</span>
      <span>{company_name || school_name}</span>
      <span>{school_name ? '主修' : '擔任'}</span>
      <span>{job_title || major}</span>
    </div>
  );
};

export default SummaryListItem;
