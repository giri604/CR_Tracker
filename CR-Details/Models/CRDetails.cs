using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CR_Details.Models
{
    public class CRDetails
    {
        public int SrNo { get; set; }
        public string CrTitle { get; set; }
        [Required]
        public string CrDescription { get; set; }
        public Complexity ComplexityList { get; set; }
        public Department DepartmentList { get; set; }
        public Category CategoryList { get; set; }
        public bool ProjectCompletedSchedule { get; set; }
        public bool KeyProjects { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime? ProjectCRReceivedDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime? FinalProjectCRReceivedDate { get; set; }

        public int NoOfCRReceivedDuringUAT { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime UATDeliveryDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime? UATSignoffDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime? ProjectCRLiveDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime? FirstCommittedLiveDate { get; set; }
        public string TAT { get; set; }
        public int NoOfShowstoppersPostGoLive { get; set; }
        public Lead UnitLead { get; set; }
        public Lead Manager { get; set; }
        public string ReasonRCA { get; set; }
        public int AttachFileId { get; set; }

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
        [Display(Name = "Pravat Sharma")]
        PravatSharma,
        [Display(Name = "Sagar Dasgupta")]
        SagarDasgupta
    }
}