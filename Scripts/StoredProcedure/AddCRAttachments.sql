USE [MyDemoDB]
GO

/****** Object:  StoredProcedure [dbo].[AddCRAttachments]    Script Date: 20 Apr 2020 5:09:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[AddCRAttachments]
@SrNo int,
@Filename varchar(55),
@ContentType nvarchar(255),
@AttachDocument varbinary(max),
@SrNoOut int Output

As
BEGIN
Insert into [dbo].[CRAttachFiles] 
		([SrNo]
      ,[FileName]
      ,[ContentType]
      ,[AttachDocument])
values
	(@SrNo,
	@Filename,
	@ContentType,
	@AttachDocument)
end
set @SrNoOut = @SrNo

return @SrNoOut
	
GO


