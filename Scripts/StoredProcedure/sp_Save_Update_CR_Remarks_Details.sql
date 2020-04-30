GO

/****** Object:  StoredProcedure [dbo].[sp_Save_Update_CR_Remarks_Details]    
 -----------Created By Ajay Bind-------------------
Script Date: 30-Apr-20 7:32:28 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_Save_Update_CR_Remarks_Details]
@Operation VARCHAR(MAX)='',
@WhereQuery VARCHAR(MAX)='',
@RefCRID VARCHAR(150)='',
@Remark VARCHAR(MAX)='',
@LoginEmail VARCHAR(MAX)=''

AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)
----------------------Operation For INSERT-------------------------
IF(@Operation = 'SAVE')
BEGIN
 SET @STRSQL = 'INSERT INTO tbl_cr_remark_details ([Ref_CR_ID],[CR_Remark],[CR_Remark_Saved_By],[CR_Remark_Saved_Date]) VALUES ('+ @RefCRID +', ' + @Remark +', '+ @LoginEmail+', GETDATE())';
END

----------------------Operation For UPDATE-------------------------
IF(@Operation = 'UPDATE')
BEGIN
SET @STRSQL ='UPDATE tbl_cr_remark_details SET [CR_Remark] =' + @Remark + ', [CR_Remark_Updated_By] =' + @LoginEmail + ', [CR_Remark_Updated_Date] = GETDATE() WHERE ('+@WhereQuery+')';
END

PRINT(@STRSQL)
EXEC(@STRSQL)
END
GO


