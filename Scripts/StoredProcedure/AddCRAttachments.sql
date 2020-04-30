GO

/****** Object:  StoredProcedure [dbo].[AddCRAttachments]    
 -----------Created By Deepak Giri-------------------
Script Date: 30-Apr-20 7:33:21 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[AddCRAttachments]
@CR_ID int,
@Filename varchar(55),
@ContentType nvarchar(255),
@AttachDocument varbinary(max)

As
BEGIN
Insert into [dbo].[CRAttachFiles] 
		([CR_ID]
      ,[FileName]
      ,[ContentType]
      ,[AttachDocument])
values
	(@CR_ID,
	@Filename,
	@ContentType,
	@AttachDocument)

update [dbo].[CRDetails] set AttachFileId = @CR_ID where CR_ID = @CR_ID
end
	
GO


