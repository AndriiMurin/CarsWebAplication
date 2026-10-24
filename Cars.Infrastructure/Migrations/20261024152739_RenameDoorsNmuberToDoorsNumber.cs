using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cars.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RenameDoorsNmuberToDoorsNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DoorsNmuber",
                table: "Cars",
                newName: "DoorsNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DoorsNumber",
                table: "Cars",
                newName: "DoorsNmuber");
        }
    }
}
