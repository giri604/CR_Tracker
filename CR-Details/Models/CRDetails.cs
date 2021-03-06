﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CR_Details.Models
{
    public class CRDetails
    {
        [Key]
        public int CR_ID { get; set; }

        [Required(ErrorMessage = "Please Enter CrTitle")]
        public string CrTitle { get; set; }

        [Required(ErrorMessage = "Please Enter CR Description")]
        public string CrDescription { get; set; }
        public Complexity? ComplexityList { get; set; } = null;
        public Department? DepartmentList { get; set; } = null;
        public Category? CategoryList { get; set; } = null;
        public bool? ProjectCompletedSchedule { get; set; } = null;
        public bool? KeyProjects { get; set; } = null;

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd-MMM-yyyy}")]
        public DateTime? ProjectCRReceivedDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd-MMM-yyyy}")]
        public DateTime? FinalProjectCRReceivedDate { get; set; }

        [Range(0, Int32.MaxValue)]
        public int? NoOfCRReceivedDuringUAT { get; set; } = null;

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd-MMM-yyyy}")]
        public DateTime? UATDeliveryDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd-MMM-yyyy}")]
        public DateTime? UATSignoffDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd-MMM-yyyy}")]
        public DateTime? ProjectCRLiveDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd-MMM-yyyy}")]
        public DateTime? FirstCommittedLiveDate { get; set; }
        public string TAT { get; set; }
        public int? NoOfShowstoppersPostGoLive { get; set; } = null;
        //public Lead? UnitLead { get; set; } = null;
        public string UnitLead { get; set; } = null;
        //public Lead? Manager { get; set; } = null;
        public string Manager { get; set; } = null;
        public CRStatus? CRStatus { get; set; } = null;

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd-MMM-yyyy}")]
        public DateTime? ExpectedDate { get; set; }
        public string ReasonRCA { get; set; }
        public int? AttachFileId { get; set; } = null;

        public List<CRAttachFiles> CRAttachFiles { get; set; }

        //Dashboard Count
        public Nullable<int> All_CR_Details_Count { get; set; }
        public Nullable<int> CR_Assinged_Count { get; set; }
        public Nullable<int> CR_Working_Count { get; set; }
        public Nullable<int> CR_Pending_Count { get; set; }
        public Nullable<int> CR_Complete_Count { get; set; }
        public Nullable<int> CR_UAT_Count { get; set; }
    }

    public enum Complexity
    {
        [Display(Name = "Simple - (1-3 days)")]
        Simple,
        [Display(Name = "Medium - (4-8 days)")]
        Medium,
        [Display(Name = "Complex - (9-15 days)")]
        Complex,
        [Display(Name = "Projects - (15 - 60 days)")]
        Projects,
        [Display(Name = "Large Projects - (60 > days)")]
        LargeProjects
    }
    public enum Department
    {
        IT,
        CEM
    }
    public enum Category
    {
        CIMA,
        Orion
    }
    public enum Lead
    {
        [Display(Name = "Amol Kumbhar")]
        AmolKumbhar,
        [Display(Name = "Ajay Bind")]
        AjayBind,
        [Display(Name = "Deepak Giri")]
        DeepakGiri
    }

    public enum Manager
    {
        [Display(Name = "Pravat Sharma")]
        PravatSharma,
        [Display(Name = "Amol Kumbhar")]
        AmolKumbhar,
        [Display(Name = "Sandeep")]
        Sandeep,
        [Display(Name = "Satish Poojari")]
        SatishPoojari,
    }

    //new field added 07-may-2020
    public enum CRStatus
    {
        Unassigned,
        Assigned,
        Working,
        Pending,
        Completed,
        UAT
    }
}