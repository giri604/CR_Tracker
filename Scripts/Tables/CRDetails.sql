SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CRDetails](
	[SrNo] [int] IDENTITY(1,1) NOT NULL,
	[CrTitle] [nvarchar](50) NULL,
	[CrDescription] [nvarchar](max) NULL,
	[ComplexityList] [nvarchar](50) NULL,
	[DepartmentList] [nvarchar](50) NULL,
	[CategoryList] [nvarchar](50) NULL,
	[ProjectCompletedSchedule] [bit] NULL,
	[KeyProjects] [bit] NULL,
	[ProjectCRReceivedDate] [nvarchar](50) NULL,
	[FinalProjectCRReceivedDate] [nvarchar](50) NULL,
	[NoOfCRReceivedDuringUAT] [int] NULL,
	[UATDeliveryDate] [nvarchar](50) NULL,
	[UATSignoffDate] [nvarchar](50) NULL,
	[ProjectCRLiveDate] [nvarchar](50) NULL,
	[FirstCommittedLiveDate] [nvarchar](50) NULL,
	[TAT] [nvarchar](50) NULL,
	[NoOfShowstoppersPostGoLive] [int] NULL,
	[UnitLead] [nvarchar](50) NULL,
	[Manager] [nvarchar](50) NULL,
	[ExpextedDate] [nvarchar](50) NULL,
	[ReasonRCA] [nvarchar](50) NULL,
	[AttachFileId] [int] NULL,
	[Created] [datetime2](3) NULL,
	[modified] [datetime2](3) NULL,
 CONSTRAINT [PK_CRDetails] PRIMARY KEY CLUSTERED 
(
	[SrNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[CRDetails] ADD  CONSTRAINT [DF_CRDetails_Created]  DEFAULT (sysdatetime()) FOR [Created]
GO